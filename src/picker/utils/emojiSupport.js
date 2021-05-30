import { determineEmojiSupportLevel } from './determineEmojiSupportLevel'
import { requestIdleCallback } from './requestIdleCallback'
// Check which emojis we know for sure aren't supported, based on Unicode version level
export const emojiSupportLevelPromise = new Promise(resolve => (
  requestIdleCallback(() => (
    resolve(determineEmojiSupportLevel()) // delay so ideally this can run while IDB is first populating
  ))
))
// determine which emojis containing ZWJ (zero width joiner) characters
// are supported (rendered as one glyph) rather than unsupported (rendered as two or more glyphs)
export const supportedZwjEmojis = new Map()

/* istanbul ignore else */
if (process.env.NODE_ENV !== 'production') {
  emojiSupportLevelPromise.then(emojiSupportLevel => {
    console.log('emoji support level', emojiSupportLevel)
  })
}
