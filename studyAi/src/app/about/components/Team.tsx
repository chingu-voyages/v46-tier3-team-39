import TeamMember from "./TeamMember"
import { Grid } from "@mui/material"

export default function Team() {
    return (
        <div className="py-16 px-5 sm:py-28 sm:px-16 text-center">
            <h1 className="text-6xl font-bold">Meet Our Team</h1>
            <p className="leading-loose">Get to know the talented individuals behind our exam prep company.</p>
            <button className="my-4 border py-5 px-2.5">Contact Us</button>
            <Grid className="text-left" container>
                <Grid item xs={6} spacing={1}>
                    <TeamMember name="Arky" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6}>
                    <TeamMember name="Ihra" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6}>
                    <TeamMember name="Tiffany" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6}>
                    <TeamMember name="Fung" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6}>
                    <TeamMember name="Connor" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
                <Grid item xs={6}>
                    <TeamMember name="Vincent" role="Developer" avatarURL="/placeholderImages/squarePlaceholder.png" linkedInURL=""/>
                </Grid>
            </Grid>
        </div>
    )
}