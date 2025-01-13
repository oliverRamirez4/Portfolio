'use client'
import * as React from 'react';
import List from '@mui/material/List';
import { useState } from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import WorkIcon from '@mui/icons-material/Work';
import ComputerIcon from '@mui/icons-material/Computer';
import SchoolIcon from '@mui/icons-material/School';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Geist_Mono } from 'next/font/google';

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
  });

export default function Timeline() {
    const [schwabOpen, setSchwabOpen] = useState(false);
    const handleSchwabClick = () => {
        setSchwabOpen(!schwabOpen);
    }

    const [AITOpen, setAITOpen] = useState(false);
    const handleAITClick = () => {
        setAITOpen(!AITOpen);
    }

    const [jacobsOpen, setJacobsOpen] = useState(false);
    const handleJacobsClick = () => {
        setJacobsOpen(!jacobsOpen);
    }

    const [jacobsTechOpen, setJacobsTechOpen] = useState(false);
    const handleJacobsTechClick = () => {
        setJacobsTechOpen(!jacobsTechOpen);
    }

    const [coColOpen, setCoColOpen] = useState(false);
    const handleCoColClick = () => {
        setCoColOpen(!coColOpen);
    }

    const [classesOpen, setClassesOpen] = useState(false);
    const handleClassesClick = () => {
        setClassesOpen(!classesOpen);
    }
    return (
        <List sx={{ width: '100%', maxWidth: 600, bgcolor: 'background.paper' }}>

            <ListItemButton onClick={handleSchwabClick}>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Software Engineer Intern @Charles Schwab" secondary="June 2025 - August 2025" />
                {schwabOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={schwabOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemAvatar>
                            <DescriptionIcon />
                        </ListItemAvatar>
                        <ListItemText secondary="For Charles Schwab I will be working 
                        in the Software Engineer Intern role building front end applications
                         on the Salesforce platform." />
                    </ListItem>
                </List>
            </Collapse>

            <ListItemButton onClick={handleAITClick}>
                <ListItemAvatar>
                    <Avatar>
                        <ComputerIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Student Researcher @AIT Budapest" secondary="Jan 2025 - May 2025" />
                {AITOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={AITOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemAvatar>
                            <DescriptionIcon />
                        </ListItemAvatar>
                        <ListItemText secondary="Semester long research program at AIT Budapest where 
                        I am investigating the role of artificial intelligence in modern software engineering." className = {geistMono.className} />
                    </ListItem>
                </List>
            </Collapse>

            <ListItemButton onClick={handleJacobsClick}>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Software Engineer Intern @ Jacobs Technology" secondary="May 2024 - August 2024" />
                {jacobsOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={jacobsOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }}>
                        <ListItemAvatar>
                            <DescriptionIcon />
                        </ListItemAvatar>
                        <ListItemText secondary="In the summer of 2024 I worked as a Software Engineer for Jacobs
                        Technology under the NIISC II Contract. As a member of the Communication Processing Systems 
                        I developed skills with network programming and learned how satelite and sensor data was 
                        handled and processed. My significant contribution through out my internship was updating 
                        over 800 JUnit tests to ensure that messages regarding missle and satelite tracking systems are 
                        distributed to the correct destinations." />
                    </ListItem>
                    <ListItemButton onClick={handleJacobsTechClick} sx={{ pl: 4 }}>
                        <ListItemAvatar>
                            <ComputerIcon />
                        </ListItemAvatar>
                        <ListItemText primary="Technology" />
                        {jacobsTechOpen ? <ExpandMore /> : <ExpandLess />}
                    </ListItemButton>
                    <Collapse in={jacobsTechOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="C" />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="Java " />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="JUnit Testing" />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="Jira" />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="BitBucket" />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="Git" />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="Agile Development" />
                            </ListItem>
                            <ListItem sx={{ pl: 12 }}>
                                <ListItemText secondary="Linux" />
                            </ListItem>
                        </List>
                    </Collapse>

                </List>
            </Collapse>

            <ListItemButton onClick={handleCoColClick}>
                <ListItemAvatar>
                    <Avatar>
                        <SchoolIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Computer Science BA @ Colorado College" secondary="August 2022 - December 2025" />
                {coColOpen ? <ExpandMore /> : <ExpandLess />}
            </ListItemButton>
            <Collapse in={coColOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    <ListItem sx={{ pl: 4 }} >
                        <ListItemAvatar>
                            <DescriptionIcon />
                        </ListItemAvatar>
                        <ListItemText secondary="I attended Colorado College from 2022 to 2025. Throughout my time 
                        at CC, I obtained a BA in Computer Science and a minor in Mathematics. In my coursework I 
                        gained a broad variety of experience through course projects and assignments. While at CC, 
                        I was a part of the NCAA Men's Soccer Team and a member of the Coding Club, the Sustainable 
                        Investment Portfolio, and the Student Athlete Advisory Committee." />

                    </ListItem>
                    <ListItemButton onClick={handleClassesClick} sx={{ pl: 4 }}>
                        <ListItemAvatar>
                            <MenuBookIcon />
                        </ListItemAvatar>
                        <ListItemText primary="Coursework" />
                        {classesOpen ? <ExpandMore /> : <ExpandLess />}
                    </ListItemButton>
                    <Collapse in={classesOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP499 Team Software Project" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP405 Theory of Computation" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP341 Optimization and Deep Learning" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP341 Natural Language Processing" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP307 Data Structures and Algorithms" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP275 Computer Organization" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP274 Software Design" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP222 Computer Science 2" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="CP122 Computer Science 1" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="MA204 Calculus 3" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="MA220 Linear Algebra" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="MA237 Statistical Methods" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="MA251 Number Theory" />
                            </ListItem>
                            <ListItem sx={{ pl: 8 }}>
                                <ListItemText secondary="MA201 Discrete Mathematics" />
                            </ListItem>
                        </List>
                    </Collapse>

                </List>
            </Collapse>

        </List>
    );
}
