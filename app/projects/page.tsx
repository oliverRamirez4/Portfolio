'use client'
import Card from "@mui/material/Card"
import { CardMedia } from "@mui/material"

export default function Page() {
    return (
        <div className="grid grid-cols-2 gap-2">
            <Card sx={{ width: 250, height: 250 }} className="flex flex-col items-center">
                <div> ColoradoVoteVisuals.com </div>
                <CardMedia
                    component="img"
                    alt="vote visual"
                    image="/images/projectCards/voteVisual.png"
                    sx={{ width: 95 / 100, height: 1 / 2 }}
                />
            </Card>
            <Card sx={{ width: 250, }}>
                <div> Natural Language Processing Labs </div>
            </Card>
        </div>
    )

}