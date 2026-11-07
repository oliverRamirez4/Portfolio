import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { buildRewrites, openHref, projects, type Project } from "../lib/projects.ts";

const originalEnv = { ...process.env };

afterEach(() => {
  process.env = { ...originalEnv };
});

function vote(overrides: Partial<Project> = {}): Project {
  return {
    shortName: "vote",
    title: "Vote",
    summary: "A project",
    repositoryUrl: "https://github.com/example/vote",
    skills: ["Postgres"],
    onSite: {
      originEnv: "PROJECT_VOTE_ORIGIN",
      assetPrefix: "/apps/vote-static",
    },
    ...overrides,
  };
}

describe("buildRewrites", () => {
  it("returns no rules when nothing is on site", () => {
    const project = vote();
    delete project.onSite;
    assert.deepEqual(buildRewrites([project]), []);
    assert.deepEqual(buildRewrites([]), []);
  });

  it("returns the three vote rules", () => {
    process.env.PROJECT_VOTE_ORIGIN = "https://vote.example";
    assert.deepEqual(buildRewrites([vote()]), [
      { source: "/apps/vote", destination: "https://vote.example/apps/vote" },
      { source: "/apps/vote/:path+", destination: "https://vote.example/apps/vote/:path+" },
      { source: "/apps/vote-static/:path+", destination: "https://vote.example/apps/vote-static/:path+" },
    ]);
  });

  it("throws on a duplicate shortName", () => {
    process.env.PROJECT_VOTE_ORIGIN = "https://vote.example";
    assert.throws(() => buildRewrites([vote(), vote()]), /duplicate shortName/);
  });

  it("throws on a duplicate assetPrefix", () => {
    process.env.PROJECT_VOTE_ORIGIN = "https://vote.example";
    process.env.PROJECT_OTHER_ORIGIN = "https://other.example";
    const other = vote({
      shortName: "other",
      onSite: { originEnv: "PROJECT_OTHER_ORIGIN", assetPrefix: "/apps/vote-static" },
    });
    assert.throws(() => buildRewrites([vote(), other]), /assetPrefix|duplicate assetPrefix/);
  });

  it("throws when the origin variable is missing", () => {
    delete process.env.PROJECT_VOTE_ORIGIN;
    assert.throws(() => buildRewrites([vote()]), /missing origin/);
  });

  it("lists Shelter Connect and the river permit wrapper after the original four", () => {
    delete process.env.PROJECT_SHELTER_CONNECT_ORIGIN;
    delete process.env.PROJECT_RIVER_PERMIT_ORIGIN;

    assert.deepEqual(
      projects.map((project) => project.shortName),
      ["colorado-vote", "nlp-labs", "level-up", "osu-clone", "shelter-connect", "river-permit"],
    );

    const shelter = projects[4];
    assert.equal(shelter.title, "Shelter Connect");
    assert.equal(
      shelter.summary,
      "A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve.",
    );
    assert.deepEqual(shelter.skills, ["TypeScript", "React", "Postgres"]);
    assert.equal(shelter.repositoryUrl, "https://github.com/oliverRamirez4/COSConnect");
    assert.equal(shelter.image, undefined);
    assert.equal(shelter.externalUrl, undefined);
    assert.equal(shelter.onSite, undefined);
    assert.equal(openHref(shelter), null);

    const river = projects[5];
    assert.equal(river.title, "River Permit API Wrapper");
    assert.equal(
      river.summary,
      "A Python tool that checks Recreation.gov for remaining river-rafting permits over a chosen date range and reports which launch dates still have permits.",
    );
    assert.deepEqual(river.skills, ["Python"]);
    assert.equal(
      river.repositoryUrl,
      "https://github.com/oliverRamirez4/recreation-gov-rafting-permit-scraper",
    );
    assert.equal(river.image, undefined);
    assert.equal(river.externalUrl, undefined);
    assert.equal(river.onSite, undefined);
    assert.equal(openHref(river), null);

    assert.deepEqual(buildRewrites(projects), []);
  });

  it("throws for reserved sources and reserved short names", () => {
    for (const shortName of ["", "resume", "blog", "projects", "experience", "_next"]) {
      assert.throws(() => buildRewrites([vote({ shortName, onSite: undefined })]), /reserved|shortName/);
    }
  });
});
