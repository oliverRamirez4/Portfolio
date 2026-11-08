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

  it("mounts the vote visualizer and Shelter Connect first", () => {
    process.env.PROJECT_COLORADO_VOTE_ORIGIN = "https://colorado-vote-visuals.vercel.app";
    process.env.PROJECT_SHELTER_CONNECT_ORIGIN = "https://cos-shelter-connect.vercel.app";

    assert.deepEqual(
      projects.map((project) => project.shortName),
      ["colorado-vote", "shelter-connect", "nlp-labs", "level-up", "osu-clone", "river-permit"],
    );

    const vote = projects[0];
    assert.equal(vote.title, "Colorado Down Ballot Visuals");
    assert.equal(vote.repositoryUrl, "https://github.com/oliverRamirez4/coloradoVoteVisuals");
    assert.deepEqual(vote.skills, ["Postgres"]);
    assert.equal(vote.image, "/voteVisual.png");
    assert.equal(vote.externalUrl, undefined);
    assert.deepEqual(vote.onSite, {
      originEnv: "PROJECT_COLORADO_VOTE_ORIGIN",
      assetPrefix: "/apps/colorado-vote-static",
    });
    assert.equal(openHref(vote), "/apps/colorado-vote");

    const shelter = projects[1];
    assert.equal(shelter.title, "Shelter Connect");
    assert.equal(
      shelter.summary,
      "A Colorado Springs homeless-shelter guide from the Colorado College TigerHacks hackathon. A person can see shelters and the people they serve.",
    );
    assert.deepEqual(shelter.skills, ["TypeScript", "React", "Postgres"]);
    assert.equal(shelter.repositoryUrl, "https://github.com/oliverRamirez4/COSConnect");
    assert.equal(shelter.image, undefined);
    assert.equal(shelter.externalUrl, undefined);
    assert.deepEqual(shelter.onSite, {
      originEnv: "PROJECT_SHELTER_CONNECT_ORIGIN",
      assetPrefix: "/apps/shelter-connect-static",
    });
    assert.equal(openHref(shelter), "/apps/shelter-connect");

    for (const shortName of ["nlp-labs", "level-up", "osu-clone", "river-permit"]) {
      const project = projects.find((item) => item.shortName === shortName);
      assert.ok(project);
      assert.equal(project.externalUrl, undefined);
      assert.equal(project.onSite, undefined);
      assert.equal(openHref(project), null);
    }

    const levelUp = projects.find((item) => item.shortName === "level-up");
    const osu = projects.find((item) => item.shortName === "osu-clone");
    assert.ok(levelUp);
    assert.ok(osu);
    assert.deepEqual(levelUp.skills, ["Hugging Face"]);
    assert.deepEqual(osu.skills, ["Java", "SQL", "Java Swing"]);

    assert.deepEqual(buildRewrites(projects), [
      {
        source: "/apps/colorado-vote",
        destination: "https://colorado-vote-visuals.vercel.app/apps/colorado-vote",
      },
      {
        source: "/apps/colorado-vote/:path+",
        destination: "https://colorado-vote-visuals.vercel.app/apps/colorado-vote/:path+",
      },
      {
        source: "/apps/colorado-vote-static/:path+",
        destination: "https://colorado-vote-visuals.vercel.app/apps/colorado-vote-static/:path+",
      },
      {
        source: "/apps/shelter-connect",
        destination: "https://cos-shelter-connect.vercel.app/apps/shelter-connect",
      },
      {
        source: "/apps/shelter-connect/:path+",
        destination: "https://cos-shelter-connect.vercel.app/apps/shelter-connect/:path+",
      },
      {
        source: "/apps/shelter-connect-static/:path+",
        destination: "https://cos-shelter-connect.vercel.app/apps/shelter-connect-static/:path+",
      },
    ]);
  });

  it("throws for reserved sources and reserved short names", () => {
    for (const shortName of ["", "resume", "blog", "projects", "experience", "_next"]) {
      assert.throws(() => buildRewrites([vote({ shortName, onSite: undefined })]), /reserved|shortName/);
    }
  });
});
