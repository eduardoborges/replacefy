<div align="center">
  <h1>✂️ replacefy</h1>
  <h4>A simple action to replace strings/env vars in your code</h4>
</div>


## Features

- ✨ Intuitive API
- 🚀 Fast


## Usage

```yaml

- name: Replacefy
  uses: ./.github/actions/replacefy
  with:
    pattern: |
      ./src/environments/environment.prod.ts
      ./src/environments/environment.ts
    replacements: |
      API_URL=${{ secrets.API_URL }}
      API_KEY=${{ secrets.API_KEY }}
```

## Let's grid it! 💪
