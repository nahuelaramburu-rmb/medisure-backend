import { Validators } from "../../config";


export class MentionExtractor{
    static extractMentions(text: string):string[]{
        const mentions = new Set<string>();
        let match;
        const regex = Validators.user;
        while ((match = regex.exec(text)) !== null) {
            if (match[1]) {
                mentions.add(match[1]);
            }
        }
        return Array.from(mentions);
    }
}