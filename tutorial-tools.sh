# tutorial-tools.sh  (keep in repo root – git-ignored if you like)
diff_section () {
  local from=$1 to=$2; shift 2
  echo -e "\n\n<details><summary>View diff</summary>\n\n\`\`\`diff" >> tutorial.md
  git diff --color=never "$from" "$to" -- "$@" >> tutorial.md
  echo -e "\`\`\`\n</details>" >> tutorial.md
}