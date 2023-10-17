import TeamMember from "./TeamMember"

export default function Team() {
    return (
        <div className="">
            <h1>Meet Our Team</h1>
            <p>Get to know the talented individuals behind our exam prep company.</p>
            <button>Contact Us</button>
            <TeamMember name="Connor" role="Developer" avatarURL="" linkedInURL=""/>
        </div>
    )
}