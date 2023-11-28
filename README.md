<div align="center">
  <h1>✂️ replacefy</h1>
  <h4>A simple action to replace strings/env vars in your code</h4>
</div>


## Features

- ✨ Intuitive API
- 🚀 Fast


## Usage

You can pass a *glob pattern* like this:

```yaml
- name: Replace Variables
  uses: eduardoborges/replacefy@v1
  with:
    pattern: ./k8s/*.yaml
  env: |
    API_URL=https://api.example.com
    API_KEY=123456789
```

Or all the files like this:

```yaml
- name: Replace Variables
  uses: eduardoborges/replacefy@v1
  with:
    pattern: |
      ./k8s/deployment.yaml
      ./k8s/service.yaml
  env: |
    API_URL=${{ secrets.API_URL }}
    API_KEY=${{ secrets.API_KEY }}
```

## Thats it! 💪
