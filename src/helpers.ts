import fs from 'fs';
import path from 'path';
import yaml from 'yaml';

const CARDS_PATH = './src/cards/';

export function getTags() {
    const files = fs.readdirSync(CARDS_PATH);
    const tagsMap = new Map<string, number>();
    for (const f of files) {
        if (f.startsWith('_')) continue;
        const card = yaml.parse(fs.readFileSync(path.join(CARDS_PATH, f), 'utf8'));
        for (const tag of card.tags) {
            tagsMap.set(tag, (tagsMap.get(tag) ?? 0) + 1);
        }
    }
    return Array.from(tagsMap.entries()).map(([slug, count]) => ({
        data: {
            id: slug,
            slug,
            count
        }
    }))
        .sort((a, b) =>
            a.data.slug.localeCompare(b.data.slug, undefined, {
                sensitivity: "base",
            }),
        );
}

function getFilenameWithoutExtension(filepath) {
    const filename = path.basename(filepath);
    const extension = path.extname(filename);
    return filename.slice(0, -extension.length);
}


export function getCards() {
    const files = fs.readdirSync(CARDS_PATH);
    const cards: any[] = []
    for (const f of files) {
        if (f.startsWith('_')) continue;
        const card = yaml.parse(fs.readFileSync(path.join(CARDS_PATH, f), 'utf8'));
        cards.push({
            id: getFilenameWithoutExtension(f),
            slug: getFilenameWithoutExtension(f),
            data: card
        });
    }
    return cards;
}