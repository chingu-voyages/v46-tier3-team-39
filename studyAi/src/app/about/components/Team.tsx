"use client"
import TeamMember from "./TeamMember"
import { Grid } from "@mui/material"
export default function Team() {
    return (
        <div className="py-16 px-5 sm:py-28 sm:px-16 text-center">
            <h1 className="text-6xl sm:text-11xl font-bold">Meet Our Team</h1>
            <p className="leading-loose sm:text-5xl">Get to know the talented individuals behind our exam prep company.</p>
            <button className="my-4 border py-5 px-2.5 sm:px-8 sm:text-3xl">Contact Us</button>
            <Grid className="text-left mt-4 sm:mt-16 mx-auto w-11/12" container spacing={2} justifyContent={"center"}>
                <Grid item xs={6} sm={4}>
                    <TeamMember name="Arky" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TeamMember name="Ihra" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TeamMember name="Tiffany" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TeamMember name="Fung" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TeamMember name="Connor" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6} sm={4}>
                    <TeamMember name="Vincent" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
            </Grid>
        </div>
    )
}