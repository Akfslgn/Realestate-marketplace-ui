# Usage: diff_section step-03-edit-toggle step-04-edit-form src/components/ProfileCard.tsx
```bash
diff_section () {
  echo "\n\n<details><summary>View diff</summary>\n\n\`\`\`diff" >> tutorial.md
  git diff --color=never "$1" "$2" -- "$3" >> tutorial.md
  echo "\`\`\`\n</details>" >> tutorial.md
}
```

## Step 1: Profile Stup


## Step 2: Display profile information from store


## Step 3: Add edit mode toggle functionality


## Step 4: Add edit form with input fields


## Step 5: Implement form state management and save functionality


## Step 6: Add password change functionality


## Step 7: Add owned properties section with delete functionality


## Step 8: Refactor edit form into separate component


## Step 9: Reorganize profile components into profile directory and Create a separate component for the ProfileDisplay


## Step 10: Extract password change into separate component


## Step 11: Extract property delete modal into separate component


## Step 12: Extract property listing section into separate component


## Step 13: Change the component Profile.jsx to index.jsx for clarity


## Step 14: Implemented Add Property Modal


## Step 14: Implemented Add Property Modal Change Backdrop


## Step 15: Integrated With Auth, Protected Routes


## Step 16: Integrated and adjusted for get and update profile info


## Step 17L Integrate the upload image api


## Step 18: Add property integration


## Added select for proprty type in the modal


## Step 18: Integrated single listing api


## Integrate with listing api - home and landing


## Implemented Wishlist Paghe and api

