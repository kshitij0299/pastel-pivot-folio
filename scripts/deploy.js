import { execSync } from 'child_process';
import { copyFileSync, existsSync } from 'fs';
import { join } from 'path';

const distDir = join(process.cwd(), 'dist');
const indexHtml = join(distDir, 'index.html');
const notFoundHtml = join(distDir, '404.html');
const cnameFile = join(process.cwd(), 'CNAME');
const distCnameFile = join(distDir, 'CNAME');

console.log('🚀 Starting deployment...\n');

// Step 1: Build the project
console.log('📦 Building project...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 2: Copy index.html to 404.html for GitHub Pages SPA fallback
console.log('📄 Creating 404.html fallback...');
if (existsSync(indexHtml)) {
  copyFileSync(indexHtml, notFoundHtml);
  console.log('✅ Created dist/404.html\n');
} else {
  console.error('❌ dist/index.html not found. Build may have failed.');
  process.exit(1);
}

// Step 3: Copy CNAME to dist if it exists
if (existsSync(cnameFile)) {
  console.log('📝 Copying CNAME to dist...');
  copyFileSync(cnameFile, distCnameFile);
  console.log('✅ CNAME copied to dist/\n');
}

// Step 4: Deploy to GitHub Pages
console.log('🌐 Deploying to GitHub Pages...');
try {
  // Check if we're in a git repository
  execSync('git rev-parse --git-dir', { stdio: 'ignore' });
  
  // Stage dist directory (force add even if in .gitignore)
  execSync('git add -f dist/', { stdio: 'inherit' });
  
  // Commit if there are changes
  try {
    execSync('git diff --staged --quiet', { stdio: 'ignore' });
    console.log('ℹ️  No changes to deploy');
  } catch {
    execSync('git commit -m "Deploy: Update dist with 404.html fallback"', { stdio: 'inherit' });
  }
  
  // Push to gh-pages branch (or main/master depending on your setup)
  // For GitHub Pages, you typically push to a gh-pages branch or push dist/ to a subtree
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf-8' }).trim();
  
  if (branch === 'main' || branch === 'master') {
    // Use subtree push to deploy dist/ to gh-pages branch
    // Force push to overwrite remote changes (common for GitHub Pages)
    console.log('📤 Pushing to gh-pages branch (force push)...');
    try {
      // First try a regular push
      execSync('git subtree push --prefix dist origin gh-pages', { stdio: 'pipe' });
      console.log('✅ Deployed to gh-pages branch\n');
    } catch (error) {
      // If push fails, use split and force push
      console.log('⚠️  Regular push failed, using force push...');
      try {
        // Split the subtree to get a clean commit
        const splitOutput = execSync('git subtree split --prefix dist -b gh-pages-split', { encoding: 'utf-8' });
        const commitHash = splitOutput.trim().split('\n').pop() || '';
        
        // Force push the split branch to gh-pages
        execSync('git push origin gh-pages-split:gh-pages --force', { stdio: 'inherit' });
        
        // Clean up local split branch
        execSync('git branch -D gh-pages-split', { stdio: 'ignore' });
        
        console.log('✅ Force pushed to gh-pages branch\n');
      } catch (forceError) {
        console.error('❌ Force push also failed:', forceError.message);
        throw forceError;
      }
    }
  } else {
    console.log(`ℹ️  Current branch is ${branch}. Pushing to origin/${branch}...`);
    execSync(`git push origin ${branch}`, { stdio: 'inherit' });
    console.log('✅ Pushed to origin\n');
  }
  
  console.log('🎉 Deployment complete!');
  console.log('📍 Your site should be available at: https://kshitij.wiki');
} catch (error) {
  console.error('❌ Deployment failed:', error.message);
  process.exit(1);
}
