// Curated library of high-quality, category-specific Unsplash photo IDs
// to ensure that all generated mock content has images matching their categories.
export const categoryImages = {
  "coding": [
    "photo-1555066931-4365d14bab8c", // editor code screen
    "photo-1542831371-29b0f74f9713", // close up html
    "photo-1607799279861-4dd421887fb3", // mechanical keyboard coding
    "photo-1517694712202-14dd9538aa97", // laptop with code screen
    "photo-1587620962725-abab7fe55159", // developer desk setup
    "photo-1618401471353-b98aedd07871", // coding github screen
    "photo-1498050108023-c5249f4df085"  // workplace developer
  ],
  "ui design": [
    "photo-1586717791821-3f44a563fa4c", // design prototype wireframe
    "photo-1581291518633-83b4ebd1d83e", // dashboard interface chart
    "photo-1541462608141-2ff01dd3e42e", // sketching layout wireframes
    "photo-1618005182384-a83a8bd57fbe", // neon glassmorphic abstract shapes
    "photo-1507238691740-187a5b1d37b8"  // interface dashboard template
  ],
  "architecture": [
    "photo-1513694203232-719a280e022f", // minimal structural interior
    "photo-1486406146926-c627a92ad1ab", // skyscraper glass patterns
    "photo-1600585154340-be6161a56a0c", // modern building facade
    "photo-1600607687939-ce8a6c25118c", // kitchen interior japandi design
    "photo-1487958449943-2429e8be8625", // brutalist design structures
    "photo-1510798831971-661eb04b3739"  // glass structure in nature
  ],
  "nature": [
    "photo-1470071459604-3b5ec3a7fe05", // foggy hills
    "photo-1441974231531-c6227db76b6e", // trees green sunbeam
    "photo-1472214222541-d510753a4707", // golden sunset meadow
    "photo-1501854140801-50d01698950b", // scenic green mountain valley
    "photo-1469474968028-56623f02e42e"  // mountains landscape road
  ],
  "fashion": [
    "photo-1539109136881-3be0616acf4b", // editorial streetwear poses
    "photo-1490481651871-ab68de25d43d", // hangers styling outfits
    "photo-1483985988355-763728e1935b", // shopping outfit lifestyle
    "photo-1515886657613-9f3515b0c78f"  // dress posing model
  ],
  "cars": [
    "photo-1503376780353-7e6692767b70", // porsche 911 rear
    "photo-1525609004556-c46c7d6cf0a3", // premium red sports car
    "photo-1494976388531-d1058494cdd8", // classic mustang muscle car
    "photo-1580273916550-e323be2ae537"  // luxury sports car garage
  ],
  "anime": [
    "photo-1578632767115-351597cf2477", // artistic digital paint
    "photo-1542751371-adc38448a05e", // gaming workspace lights
    "photo-1607604276583-eef5d076aa5f", // tokyo arcade neon look
    "photo-1501183007986-d0d080b147f9"  // lofi sunset sky bedroom
  ],
  "fitness": [
    "photo-1517838277536-f5f99be501cd", // gym weights barbells
    "photo-1534438327276-14e5300c3a48", // workout athlete physical
    "photo-1581009146145-b5ef050c2e1e"  // running track athlete form
  ],
  "food": [
    "photo-1546069901-ba9599a7e63c", // fresh salad bowl
    "photo-1565299624946-b28f40a0ae38", // slice of wood fired pizza
    "photo-1482049016688-2d3e1b311543", // eggs on toast close up
    "photo-1473093295043-cdd812d0e601"  // fresh pasta bowl
  ],
  "travel": [
    "photo-1469854523086-cc02fe5d8800", // desert road trip highway
    "photo-1507525428034-b723cf961d3e", // sandy beach palm sunset
    "photo-1488646953014-85cb44e25828", // passenger holding paper map
    "photo-1476514525535-07fb3b4ae5f1"  // mountains lake boat ride
  ],
  "streetwear": [
    "photo-1552374196-1ab2a1c593e8", // model jacket streetwear look
    "photo-1509281373149-e957c6296406", // retro high top sneakers neon
    "photo-1556905055-8f358a7a47b2", // modern hoodies style
    "photo-1529139574466-a303027c1d8b"  // street outfit editorial pose
  ],
  "gadgets": [
    "photo-1546868871-7041f2a55e12", // smart watch wearable
    "photo-1505740420928-5e560c06d30e", // retro style headphones
    "photo-1605236453806-6ff36851218e", // smartphone mockup table
    "photo-1527689368864-3a821dbccc34"  // tablet stylus drawing
  ],
  "pets": [
    "photo-1543466835-00a7907e9de1", // retriever dog smiling
    "photo-1514888286974-6c03e2ca1dba", // domestic cat look up
    "photo-1530281700549-e82e7bf110d6", // running corgi active
    "photo-1548199973-03cce0bbc87b"  // playing puppies outdoor
  ],
  "aesthetic lifestyle": [
    "photo-1616486338812-3dadae4b4ace", // cozy Japandi lounge chair
    "photo-1513694203232-719a280e022f", // aesthetic study corner
    "photo-1600607687939-ce8a6c25118c", // modern visual kitchen layout
    "photo-1600585154340-be6161a56a0c", // minimal outdoor balcony deck
    "photo-1510798831971-661eb04b3739"  // tiny glass house sunset
  ]
};

export const getImageUrlForCategory = (category, index, height = 600) => {
  const normCat = category.toLowerCase().trim();
  const keys = Object.keys(categoryImages);
  
  let selectedCategory = normCat;
  if (normCat === 'all' || !categoryImages[normCat]) {
    // Pick a deterministic category based on index
    selectedCategory = keys[index % keys.length];
  }
  
  const idList = categoryImages[selectedCategory];
  const photoId = idList[index % idList.length];
  
  return `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=600&h=${height}&q=80`;
};
