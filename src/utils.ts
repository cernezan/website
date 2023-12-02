export function slugify(text: string) {
    return text
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "")
        .replace(
            /([\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])/g,
            "",
        );
}

export function removeMarkdown(str: string) {
    return str
        .replace(/!\[(.*?)\]\(<(.*?)>\s"(.*?)"\)/, "") // Image with title
        .replace(/(\*\*|__)(.*?)\1/g, "$2") // Bold
        .replace(/(\*|_)(.*?)\1/g, "$2") // Italic
        .replace(/\[(.*?)\]\((.*?)\)/g, "$1") // Links
        .replace(/\n\*(.*)/g, "$1") // Unordered list items
        .replace(/!\[(.*?)\]\((.*?)\)/g, "$1") // Images
        .replace(/`([^`]+)`/g, "$1") // Inline code
        .replace(/\n{2,}/g, "\n\n") // Remove multiple line breaks
        .replace(/#{1,6}\s+(.*)/g, "$1") // Headers
        .replace(/-{3,}/g, "") // Horizontal rule
        .replace(/```[^`]*```/g, "") // Fenced code blocks
        .replace(/~~(.*?)~~/g, "$1") // Strikethrough
        .replace(/<[^>]*>/g, "") // HTML tags
        .replace(/&nbsp;/g, " ") // Non-breaking space
        .replace(/&amp;/g, "&") // Ampersand
        .replace(/&lt;/g, "<") // Less than
        .replace(/&gt;/g, ">") // Greater than
        .replace(/&quot;/g, '"') // Quote
        .replace(/&#039;/g, "'"); // Apostrophe
}
export function shuffleArray(array: any[]) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

import { SITE_TITLE } from "../src/consts";

export function prepareTitle(
    title: string | undefined,
    url: string,
    description: string,
    isPost: boolean,
    withoutSiteTitle: boolean = false,
): string {
    if (url === "/") {
        return SITE_TITLE + " - " + "Personal Website";
    } else if (title === "" || (undefined && isPost && withoutSiteTitle)) {
        return (
            removeMarkdown(description).slice(0, 45) +
            "..." +
            "  ·  " +
            SITE_TITLE
        );
    } else if (title === undefined && isPost && withoutSiteTitle) {
        return (
            removeMarkdown(description).slice(0, 45) +
            "..." +
            "  ·  " +
            SITE_TITLE
        );
    } else if (title === undefined) {
        return SITE_TITLE;
    } else if (title !== undefined && withoutSiteTitle) {
        return title + "  ·  " + SITE_TITLE;
    }
    return `${title}  ·  ${SITE_TITLE}`;
}
