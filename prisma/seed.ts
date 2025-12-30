import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// Prisma 7+ reads DATABASE_URL from prisma.config.ts automatically
const prisma = new PrismaClient();

const poems = [
    {
        title: "The Whispered Echo",
        content: `In the silence between heartbeats,
There lies a world unspoken.
A symphony of shadows,
Calling to the broken.

The digital void consumes the light,
But words remain as stars.
Woven into the fabric of the night,
To heal our hidden scars.

Speak softly, spirit,
For the void is deep and wide.
But within this sanctuary,
There is nowhere left to hide.`,
        authorName: "Kojo Afari",
        authorEmail: "kojo@silentvoice.art",
    },
    {
        title: "Shadows of Gold",
        content: `Ancient light dances upon the obsidian floor,
A memory of a time before time.
When gods walked among the mortals,
And poetry was the only crime.

The gold dust settles on my weary hands,
As I trace the constellations of the past.
Each star a word, each word a prayer,
Hoping this moment will last.`,
        authorName: "Ama Serwaa",
        authorEmail: "ama@silentvoice.art",
    },
    {
        title: "The Silent Weaver",
        content: `Threads of silence woven into the fabric of the night,
A tapestry of stars and secrets untold.
The loom of destiny hums its ancient song,
As the weaver's hands grow cold.

Each thread a life, each knot a choice,
The pattern emerges from the void.
In silence we create, in silence we destroy,
In silence, we are overjoyed.`,
        authorName: "Issahaku M.",
        authorEmail: "issahaku@silentvoice.art",
    },
    {
        title: "Digital Dust",
        content: `Bits and bytes floating in the void,
A poetry of circuits and soul.
The machine hums its electric psalm,
As algorithms take their toll.

We are the children of the digital age,
Born of code and light.
Our voices echo through the wires,
Dancing through the endless night.`,
        authorName: "Suleiman Ali",
        authorEmail: "suleiman@silentvoice.art",
    },
    {
        title: "The Sacred Breath",
        content: `Expelling the air of a thousand lifetimes,
Finding peace in the exhale.
The lungs remember what the mind forgets,
Every story, every tale.

Breathe in the cosmos, breathe out the chaos,
Let the rhythm be your guide.
In the sacred space between each breath,
The universe resides inside.`,
        authorName: "Fatima Ba",
        authorEmail: "fatima@silentvoice.art",
    },
];

async function seed() {
    console.log("🌱 Seeding poems into the sanctuary...\n");

    for (const poem of poems) {
        const user = await prisma.user.upsert({
            where: { email: poem.authorEmail },
            update: { name: poem.authorName },
            create: { email: poem.authorEmail, name: poem.authorName },
        });

        const created = await prisma.poem.create({
            data: {
                title: poem.title,
                content: poem.content,
                authorId: user.id,
                status: "approved",
                approvedAt: new Date(),
            },
        });

        console.log(`✨ Created: "${created.title}" by ${poem.authorName}`);
    }

    console.log("\n🎉 Seeding complete! The sanctuary has been blessed with poetry.");
}

seed()
    .catch((e) => {
        console.error("Seeding failed:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
