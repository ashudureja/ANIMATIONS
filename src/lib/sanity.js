import { createClient } from '@sanity/client';

// Get the project ID from your Sanity Studio config
const projectId = 'rtro2rvw'; // Replace with your project ID from sanity.config.js if different
const dataset = 'production';
const apiVersion = '2023-05-03'; // Use a date you know the API was deployed

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if you want to ensure fresh content
});

// Fetch all animations
export async function getAllAnimations() {
  return client.fetch(`*[_type == "animation"] | order(name asc) {
    _id,
    id,
    name,
    description,
    category,
    componentKey,
    tags,
    video{
    asset->{
      url
  }},
    featured
  }`);
}

// Fetch animations by category
export async function getAnimationsByCategory(category) {
  return client.fetch(`*[_type == "animation" && category == $category] | order(name asc) {
    _id,
    id,
    name,
    description,
    category,
    componentKey,
    tags,
     video{
    asset->{
      url
    }
  },
    
    featured,
    
  }`, { category });
}

// Fetch a single animation by ID slug
export async function getAnimationById(id) {
  return client.fetch(`*[_type == "animation" && id.current == $id][0] {
    _id,
    id,
    name,
    description,
    category,
    componentKey,
    code,
    usage,
    dependencies,
    utils,
    tags,
    props,

    video{
    asset->{
      url
    }
  },
    featured
  }`, { id });
}

// Fetch featured animations
export async function getFeaturedAnimations() {
  return client.fetch(`*[_type == "animation" && featured == true] | order(name asc) {
    _id,
    id,
    name,
    description,
    category,
    componentKey,
    tags,
    video{
    asset->{
      url
    }
  }
  }`);
} 