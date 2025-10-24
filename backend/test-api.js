const axios = require('axios');

const BASE_URL = 'https://drhabtamuorthopedics.com/api';

// Test function
async function testAPI() {
  try {
    console.log('🧪 Testing DHMC Backend API...\n');

    // Test health check
    console.log('1. Testing health check...');
    const healthResponse = await axios.get(`${BASE_URL}/health`);
    console.log('✅ Health check:', healthResponse.data);

    // Test publications
    console.log('\n2. Testing publications...');
    const publicationsResponse = await axios.get(`${BASE_URL}/publications`);
    console.log('✅ Publications:', publicationsResponse.data.length, 'items');

    // Test services
    console.log('\n3. Testing services...');
    const servicesResponse = await axios.get(`${BASE_URL}/services`);
    console.log('✅ Services:', servicesResponse.data.length, 'items');

    // Test experiences
    console.log('\n4. Testing experiences...');
    const experiencesResponse = await axios.get(`${BASE_URL}/experiences`);
    console.log('✅ Experiences:', experiencesResponse.data.length, 'items');

    // Test physicians
    console.log('\n5. Testing physicians...');
    const physiciansResponse = await axios.get(`${BASE_URL}/physicians`);
    console.log('✅ Physicians:', physiciansResponse.data.length, 'items');

    // Test news
    console.log('\n6. Testing news...');
    const newsResponse = await axios.get(`${BASE_URL}/news`);
    console.log('✅ News:', newsResponse.data.length, 'items');

    // Test gallery
    console.log('\n7. Testing gallery...');
    const galleryResponse = await axios.get(`${BASE_URL}/gallery`);
    console.log('✅ Gallery:', galleryResponse.data.length, 'items');

    // Test testimonials
    console.log('\n8. Testing testimonials...');
    const testimonialsResponse = await axios.get(`${BASE_URL}/testimonials`);
    console.log('✅ Testimonials:', testimonialsResponse.data.length, 'items');

    console.log('\n🎉 All API tests passed! Backend is working correctly.');

  } catch (error) {
    console.error('❌ API test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run tests
testAPI();
