function longestCommonPrefix(strs: string[]): string {
    if (strs.length === 0) return "";

    // 1. Loop through every character index 'i' of the smallest word ("flow")
    for (let i = 0; i < Math.min(...strs.map(s => s.length)); i++) {
        const charToMatch = strs[0][i]; // This is the character we are checking (e.g., 'f', then 'l', etc.)

        // 2. Loop through all the OTHER words in the array
        for (let j = 1; j < strs.length; j++) {
            
            // 3. If the current word is shorter than 'i' OR the letters don't match
            if (i === strs[j].length || strs[j][i] !== charToMatch) {
                
                // We found a mismatch! Slice the first word up to this point.
                return strs[0].slice(0, i);
            }
        }
    }

    return strs[0];
}

console.log(longestCommonPrefix(["flower","flow","flight"])); 
console.log(longestCommonPrefix(["dog","racecar","car"]));   
