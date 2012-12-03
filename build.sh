#!/usr/bin/env zsh
cat <(echo "<a href='javascript:") checkmate.js <(echo "'>jsCheckMate</a>")|tr -d "\n" > bookmarklink.html
cat <(echo "javascript:") checkmate.js | pbcopy
