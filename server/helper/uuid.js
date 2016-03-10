const digitCount = 24;

/**
 * Create predictable uuid strings for a given number
 * @param i integer parameter which is key and differentiator for uuids
 * @return uuid string representation
 *  3 => "111111111111111111111113"
 * 67 => "111111111111111111111167"
 */
export function get(i) {
    let iStr = i.toString();
    return '1'.repeat(digitCount - iStr.length) + iStr;
}
