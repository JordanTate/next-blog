# Next.js Blog

Hi all! This is the project files for my blog, built using Next.js, MySql and Auth.js. The blog features a very lite CMS that I made for basic CRUD operations, which I'm hoping to expand upon in the future.

[Check out my blog here!](https://blog.jordantate.dev)

### What's Next?

I plan to continously develop this application in parralel to me actually using this blog. I hope for this to be a benefical learning experience for me. Already it's taught me managing DNS records _(I've never had to host anything before)_.

### Setup

Feel free to clone this off yourself as as base template for your own blog, or if you're just looking to learn, _although I wouldn't use me to learn as I'm very much a beginner and could do with advise myself!_

Here are some basic steps to get you started. You'll need Node and NPM installed if you don't already.

1. Clone the repository.
2. Create a **.env** file in the repository and add the enviromental variables for your MySQL database, Auth.js and AWS S3 setup. I've used the following:

- DATABASE_URL
- AUTH_SECRET
- AUTH_GOOGLE_ID
- AUTH_GOOGLE_SECRET
- AWS_REGION
- AWS_BUCKET
- AWS_ACCESS_KEY
- AWS_SECRET_KEY

There are some additional environment variables I've included in deployment, but these might be based on use case. 3. In your CLI, run `npm run dev` to run a development build, or `npm run build` and `npm run start` for production. 4. Application should be running on your http://localhost:3000.
