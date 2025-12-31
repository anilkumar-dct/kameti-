# kameti-management

An Electron application with React and TypeScript

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) + [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Project Setup

### Install

```bash
$ npm install
```

### Development

```bash
$ npm run dev
```

### Build

```bash
# For windows
$ npm run build:win

# For macOS
$ npm run build:mac

# For Linux
$ npm run build:linux
```

### 🛠️ First-Time Setup (After Cloning)
If you are setting up the project for the first time:
1. **Clone the repo**: `git clone <repo-url>`
2. **Install Dependencies**: `npm install`
3. **Generate Prisma Client**: `npx prisma generate`
4. **Database Migration**:
   ```bash
   npx dotenv -e .env.development -- npx prisma migrate dev
   ```

### 🗄️ Prisma Database Commands
For managing the database schema during development:

- **Generate Client**: `npx prisma generate` (Run this after changing `schema.prisma`)
- **Apply Migrations**: `npx dotenv -e .env.development -- npx prisma migrate dev`
- **Reset Database**: `npx dotenv -e .env.development -- npx prisma migrate reset`
- **Studio (UI UI)**: `npx dotenv -e .env.development -- npx prisma studio`

---

## 🚀 Auto-Update Implementation & Troubleshooting

We have implemented a seamless background update system using `electron-updater` and GitHub Actions.

### 1. Implementation Steps
1. **Dependencies**: Installed `electron-updater` and `electron-log`.
2. **Main Process**: Created `src/main/updater.ts` to handle checking, downloading, and installing updates.
3. **Renderer Process**: Built a `UpdateNotification` React component to show progress to users.
4. **CI/CD**: Configured `.github/workflows/electron-build.yml` to automatically build and publish installers when a Git tag (e.g., `v1.0.2`) is pushed.

### 2. Common Issues & Solutions

| Issue | Cause | Solution |
| :--- | :--- | :--- |
| **"No published versions on GitHub"** | The app found the repo but no official release exists. | Push a Git tag (e.g., `git tag v1.0.2 && git push --tags`). |
| **HttpError: 406 / 404** | The release exists but is hidden as a **Draft**. | Go to GitHub Releases and click **"Publish Release"** on the draft. |
| **Missing `latest.yml`** | The build script didn't generate metadata. | Ensure build command includes `--publish always`. |
| **Permissions Error** | GitHub Action cannot create the release. | Add `permissions: contents: write` to the workflow file. |

### 3. How to Release a New Version & Make it Public

Follow these steps whenever you modify your app and want to push a new version to your users:

1. **Update Version**: Change the `"version"` number in `package.json` (e.g., from `1.0.2` to `1.0.3`).
2. **Commit changes**:
   ```bash
   git add .
   git commit -m "feat: your new changes"
   ```
3. **Push with Tag**:
   ```bash
   git tag v1.0.3
   git push origin main --tags
   ```
4. **Wait for Build**: Go to the **Actions** tab in your GitHub repo and wait for the build to turn **Green**.
5. **MAKE IT PUBLIC (Important!)**: 
   * Go to the [Releases Page](https://github.com/anilkumar-dct/kameti-/releases).
   * You will likely see your new version marked as a **Draft**.
   * Click **Edit** (pencil icon or button) on that Draft.
   * Click the big green **"Publish Release"** button at the bottom.
   
> [!NOTE]
> The auto-updater **cannot see** Draft releases. You must click "Publish Release" for users to receive the update.
