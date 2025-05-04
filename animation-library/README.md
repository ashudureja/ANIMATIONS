# Animation Library with Sanity Studio

This is a Sanity Studio project for managing animation components. The studio allows you to create, edit, and organize animations that can be displayed in your main application.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run Sanity Studio:**
   ```bash
   npm run dev
   ```

3. **Open Sanity Studio:**
   - Access the studio at [http://localhost:3333](http://localhost:3333)
   - Log in with your Sanity account

## Working with Animation Content

### Adding a New Animation

1. Click "Animation" in the left sidebar
2. Click "Create new document"
3. Fill in the required fields:
   - ID: A unique identifier slug for the animation
   - Component Key: Key to identify the component in your front-end
   - Category: Choose from predefined categories
   - Name: The name of the animation
   - Description: A description of what the animation does
   - Code: The source code for the animation component
   - Tags: Keywords to help categorize and search for this animation
   - Other optional fields as needed

### Managing Content

- Use the studio interface to manage your animations
- All content is stored in Sanity's cloud and can be accessed via their API
- Changes are published immediately when you click "Publish"

## Connecting to Your Front-End

To use this content in your front-end application, you'll need to:

1. Install the Sanity client in your front-end project
2. Configure it with your project ID and dataset
3. Query the animations using GROQ or GraphQL

## More Information

For more detailed information on using Sanity, refer to their [official documentation](https://www.sanity.io/docs).
