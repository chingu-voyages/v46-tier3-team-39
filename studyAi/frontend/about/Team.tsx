import TeamMember from "./TeamMember";
import Grid from "@mui/material/Grid";
import NextLink from "next/link";
export default function Team() {
  return (
    <div className="py-16 px-5 sm:py-24 sm:px-16 text-center">
      <h1 className="text-6xl sm:text-7xl font-bold">Meet Our Team</h1>
      <p className="leading-loose sm:text-3xl">
        Get to know the talented individuals behind our exam prep company.
      </p>
      <button className="my-4 border py-3 px-2 sm:px-6 sm:text-1xl">
        <NextLink
          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          key={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
        >
          Contact Us
        </NextLink>
      </button>
      <Grid
        className="text-left mt-4 sm:mt-16 mx-auto w-11/12"
        container
        spacing={4}
        justifyContent={"center"}
      >
        <Grid item xs={6} sm={4}>
          <TeamMember
            name="Arky"
            role="Developer"
            avatarURL="/Arky.png"
            linkedInURL="https://www.linkedin.com/in/arky-asmal/"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TeamMember
            name="Irha"
            role="Developer"
            avatarURL="/avatar.png"
            linkedInURL="https://www.linkedin.com/in/irha-ali-522039105/"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TeamMember
            name="Connor"
            role="Developer"
            avatarURL="/Connor.png"
            linkedInURL="https://www.linkedin.com/in/connor-crump-b83166264/"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TeamMember
            name="Tiffany"
            role="Developer"
            avatarURL="/Tiffany.png"
            linkedInURL="https://www.linkedin.com/in/pui-yi-tiffany-chan-2a35271a5/"
          />
        </Grid>
        <Grid item xs={6} sm={4}>
          <TeamMember
            name="Fung"
            role="Developer"
            avatarURL="/avatar.png"
            linkedInURL="https://www.linkedin.com/in/fung-au-689a80239/ "
          />
        </Grid>
      </Grid>
    </div>
  );
}
