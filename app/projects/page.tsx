'use client'
import Card from "@mui/material/Card"
import { CardMedia } from "@mui/material"
import GitHub from "@mui/icons-material/GitHub"
import InsertLink from "@mui/icons-material/InsertLink"
import Link from "next/link"

export default function Page() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-0 gap-4">
            {/* Colorado Vote Visualizations */}
            <Card sx={{ width: 1, height: 275 }} className="flex flex-col items-center">
                <h1 className='text-xl font-medium'> Colorado Down Ballot Visuals </h1>
                <div className='grid grid-cols-2 px-2'>
                    <p className='text-xs'>
                        For my thesis project I worked alongside my group of 5 senior computer Science
                        students to build a full stack application that provides a resource to Colorado
                        journalists for visualizing down ballot election results which are saller ballot
                        measures at the state level. Our project was complete with iframe embed codes and
                        a 20 year postgresql database of all ballot results.
                    </p>
                    <CardMedia
                        component="img"
                        alt="vote visual"
                        image="/voteVisual.png"
                        sx={{
                            width: 275,  // Fixed width
                            height: 190, // Fixed height
                            objectFit: 'contain', // Ensures the image scales without cropping
                        }}
                    />
                </div>
                <div className="w-full flex justify-center gap-10 ">
                    <Link href='https://github.com/oliverRamirez4/coloradoVoteVisuals' target="_blank">
                        <GitHub
                            sx={{ //scale 1.5x originally then scal 1.5x again on hover over 0.3s
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.5)', },
                                scale: 1.5,
                            }} />
                    </Link>
                    <Link href='https://coloradovotevisuals.com' target="_blank">
                        <InsertLink
                            sx={{ //scale 1.5x originally then scal 1.5x again on hover over 0.3s
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.5)', },
                                scale: 1.5,
                            }}
                        />

                    </Link>
                </div>
            </Card>

            {/* Natural Language Processing Labs */}
            <Card sx={{ width: 1, height: 275 }} className="flex flex-col items-center">
                <h1 className='text-xl font-medium'>Natural Language Processing Labs</h1>
                <div className='grid grid-cols-2 px-2'>
                    <p className='text-xs'>
                        Labs I completed for the Natural Language Processing Course at Colorado
                        College all written in python. Topics included semantic analysis, word embeddings,
                        speech classification, and semantic similarity using cosine similarity of word embeddings.
                        Starter code for labs was provided by Professor Blake Jackson.
                    </p>
                    <CardMedia
                        component="img"
                        alt="word Embedding Similarity"
                        image="/cosineSimilarity.png"
                        sx={{
                            width: 275,  // Fixed width
                            height: 190, // Fixed height
                            objectFit: 'contain', // Ensures the image scales without cropping
                        }}
                    />
                </div>
                <div className="w-full flex justify-center gap-6 ">
                    <Link href='https://github.com/oliverRamirez4' target="_blank">
                        <GitHub
                            sx={{ //scale 1.5x originally then scal 1.5x again on hover over 0.3s
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.5)', },
                                scale: 1.5,
                            }} />
                    </Link>
                    <Link href='https://github.com/oliverRamirez4' target="_blank">
                        <InsertLink
                            sx={{ //scale 1.5x originally then scal 1.5x again on hover over 0.3s
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.5)', },
                                scale: 1.5,
                            }} />
                    </Link>
                </div>
            </Card>

            {/* Level-Up Chat Bot */}
            <Card sx={{ width: 1, height: 275 }} className="flex flex-col items-center">
                <h1 className='text-xl font-medium'>Conversational AI Chat Interface </h1>
                <div className='grid grid-cols-2 px-2'>
                    <p className='text-xs'>
                        A full stack application I built which allows the user to talk with the
                        blender AI conversational chatbot. This project acted as an introduction
                        to full-stack applications and I was able to work with many front end
                        technologies for the first time while gaining familiarity with Hugging Face
                        Machine Learning Library.
                    </p>
                    <CardMedia
                        component="img"
                        alt="conversation chat img"
                        image="/levelUp.png"
                        sx={{
                            width: 275,  // Fixed width
                            height: 190, // Fixed height
                            objectFit: 'contain', // Ensures the image scales without cropping
                        }}
                    />
                </div>
                <div className="w-full flex justify-center gap-6 ">
                    <Link href='https://github.com/oliverRamirez4/LevelUp2024' target="_blank">
                        <GitHub
                            sx={{ //scale 1.5x originally then scal 1.5x again on hover over 0.3s
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.5)', },
                                scale: 1.5,
                            }} />
                    </Link>
                </div>
            </Card>

            {/* Osu Project Clone */}
            <Card sx={{ width: 1, height: 275 }} className="flex flex-col items-center">
                <h1 className='text-xl font-medium'>Osu Rhythm Game Clone</h1>
                <div className='grid grid-cols-2 px-2'>
                    <p className='text-xs'>
                        A clone of the rhythm game OSU built with Java. Implemented a music player
                        that plays on a seperate thread, a leaderboard using SQL, and a file reading
                        system that allows us to drop a .osu file into our game and it will automatically
                        generate a level based on the files parameters. UI built with Java Swing library.
                    </p>
                    <CardMedia
                        component="img"
                        alt="Osu Game img"
                        image="/OsuGame.png"
                        sx={{
                            width: 275,  // Fixed width
                            height: 190, // Fixed height
                            objectFit: 'contain', // Ensures the image scales without cropping
                        }}
                    />
                </div>
                <div className="w-full flex justify-center gap-6 ">
                    <Link href='https://github.com/oliverRamirez4/Osu-Game-Clone-Java' target="_blank">
                        <GitHub
                            sx={{ //scale 1.5x originally then scal 1.5x again on hover over 0.3s
                                transition: 'transform 0.3s ease',
                                '&:hover': { transform: 'scale(1.5)', },
                                scale: 1.5,
                            }} />
                    </Link>
                    
                </div>
            </Card>


        </div>
    )

}