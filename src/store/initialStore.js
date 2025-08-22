/**
 * @file initialState.js
 * @description This file defines the initial state of the application store in a Flux architecture.
 * The initial state is an object that holds the default values for the application's state.
 * It is used by the store to initialize its state and can be referenced throughout the application
 * to reset or compare the current state.
 *
 * The initial state object for the Redux store.
 *
 * This object defines the default state of the application before any actions are dispatched.
 *
 * Usage:
 * - Import this initialState object into your store configuration.
 * - Use it to set up the default state for your reducers.
 *
 * What is a slice:
 * - A slice is a portion of the initial state that is managed by a specific reducer.
 * - Each slice typically corresponds to a specific feature or domain in your application.
 *
 * How to adjust for your needs:
 * - Add properties to this object to define the initial state for different slices of your application.
 * - Ensure that each property corresponds to a slice managed by a reducer.
 *
 * @example:
 * const initialState = {
 *   user: {
 *     isAuthenticated: false,
 *     details: null,
 *   },
 *   posts: {
 *     list: []
 *   },
 * };
 *
 * @author dmytro-ch21
 */
export const initialState = () => ({
  // demo for todos - replace with your needed state
  todos: [
    {
      id: "1",
      title: "This comes from your global store, delete it!",
      completed: false,
    },
  ],
  user: {
    isAuthenticated: false,
    userId: 1,
  },
  listings: [
    {
      id: 1,
      owner_id: 2,
      title: "Sun-Soaked Alki Beach Condo",
      description:
        "Modern two-bedroom condo steps from Alki Beach with floor-to-ceiling windows and a private balcony.",
      tag: "Elliott Bay View",
      address: "1234 Alki Ave SW",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "condo",
      area_sqft: 1500,
      bedrooms: 2,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 399000.57,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747087939/listing_images/v1nawkubeyq546vjshlj.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 2,
      owner_id: 2,
      title: "Lake-Union Loft with Rooftop Deck",
      description:
        "Chic loft overlooking Lake Union, featuring exposed brick, timber beams, and a shared rooftop deck.",
      tag: "Lake Union View",
      address: "2558 Eastlake Ave E",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "condo",
      area_sqft: 1580,
      bedrooms: 2,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 533030.5,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102867/listing_images/dfm1i8msdwtq01wxupqu.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 3,
      owner_id: 2,
      title: "Magnolia Bluff Craftsman",
      description:
        "Classic Craftsman on Magnolia Bluff with wrap-around porch, lush garden, and panoramic sound views.",
      tag: "Puget Sound Breeze",
      address: "789 Magnolia Blvd W",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "house",
      area_sqft: 1820,
      bedrooms: 3,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 711000.77,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1746921248/listing_images/oqx14hhlxpaz0rjgjj7u.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 4,
      owner_id: 2,
      title: "High-Rise Penthouse Downtown",
      description:
        "Luxury penthouse on the 32nd floor with 270° skyline views, concierge, and private elevator entry.",
      tag: "Downtown Skyline",
      address: "610 5th Ave S, Unit 3201",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "penthouse",
      area_sqft: 2100,
      bedrooms: 3,
      bathrooms: 2.5,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 949950.0,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102986/listing_images/yl5f7lqb9gehy1a9ilrg.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 5,
      owner_id: 2,
      title: "Ballard Modern Farmhouse",
      description:
        "Freshly built modern farmhouse in Ballard with chef’s kitchen, smart-home features, and cedar deck.",
      tag: "Ballard Charm",
      address: "1503 NW 57th St",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "house",
      area_sqft: 1750,
      bedrooms: 3,
      bathrooms: 2.5,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 1000000.77,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747087939/listing_images/v1nawkubeyq546vjshlj.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 6,
      owner_id: 2,
      title: "Rainier Beach Bungalow",
      description:
        "Cozy bungalow near Lake Washington with updated kitchen, large backyard, and detached studio.",
      tag: "Rainier Vista",
      address: "9001 Rainier Ave S",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "house",
      area_sqft: 1420,
      bedrooms: 2,
      bathrooms: 1.5,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 785000.25,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102801/listing_images/y4vkhgxvk7nos3mkxqs0.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 7,
      owner_id: 2,
      title: "Madison Park Mid-Century Gem",
      description:
        "Mid-century residence in Madison Park with open-beam ceilings, courtyard, and lake access.",
      tag: "Madison Park Retreat",
      address: "1122 42nd Ave E",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "house",
      area_sqft: 1680,
      bedrooms: 3,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 820000.99,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102999/listing_images/piqhjlzsrbgckspcm6et.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 8,
      owner_id: 2,
      title: "West Seattle View Townhome",
      description:
        "End-unit townhome perched above California Ave with rooftop terrace and sweeping sunset vistas.",
      tag: "West Seattle Sunset",
      address: "3211 California Ave SW",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "townhouse",
      area_sqft: 1600,
      bedrooms: 2,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 845500.5,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102999/listing_images/piqhjlzsrbgckspcm6et.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
  ],
  wishlist: [
    {
      id: 1,
      owner_id: 2,
      title: "Sun-Soaked Alki Beach Condo",
      description:
        "Modern two-bedroom condo steps from Alki Beach with floor-to-ceiling windows and a private balcony.",
      tag: "Elliott Bay View",
      address: "1234 Alki Ave SW",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "condo",
      area_sqft: 1500,
      bedrooms: 2,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 399000.57,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747087939/listing_images/v1nawkubeyq546vjshlj.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 2,
      owner_id: 2,
      title: "Lake-Union Loft with Rooftop Deck",
      description:
        "Chic loft overlooking Lake Union, featuring exposed brick, timber beams, and a shared rooftop deck.",
      tag: "Lake Union View",
      address: "2558 Eastlake Ave E",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "condo",
      area_sqft: 1580,
      bedrooms: 2,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 533030.5,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102867/listing_images/dfm1i8msdwtq01wxupqu.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
    {
      id: 3,
      owner_id: 2,
      title: "Magnolia Bluff Craftsman",
      description:
        "Classic Craftsman on Magnolia Bluff with wrap-around porch, lush garden, and panoramic sound views.",
      tag: "Puget Sound Breeze",
      address: "789 Magnolia Blvd W",
      city: "Seattle",
      state: "WA",
      zip_code: "30303",
      property_type: "house",
      area_sqft: 1820,
      bedrooms: 3,
      bathrooms: 2,
      latitude: 47.746734,
      longitude: -122.87435,
      price: 711000.77,
      images: [
        {
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1746921248/listing_images/oqx14hhlxpaz0rjgjj7u.png",
        },
      ],
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
    },
  ],
  mockUserData: {
    created_at: "Sat, 10 May 2025 21:49:05 GMT",
    email: "new@email.com",
    id: 2,
    is_active: true,
    is_admin: false,
    username: "new_user",
    updated_at: "Sat, 10 May 2025 21:49:05 GMT",
    listed_properties: [
      {
        id: 1,
        owner_id: 2,
        title: "Sun-Soaked Alki Beach Condo",
        description:
          "Modern two-bedroom condo steps from Alki Beach with floor-to-ceiling windows and a private balcony.",
        tag: "Elliott Bay View",
        address: "1234 Alki Ave SW",
        city: "Seattle",
        state: "WA",
        zip_code: "30303",
        property_type: "condo",
        area_sqft: 1500,
        bedrooms: 2,
        bathrooms: 2,
        latitude: 47.746734,
        longitude: -122.87435,
        price: 399000.57,
        images: [
          {
            image_url:
              "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747087939/listing_images/v1nawkubeyq546vjshlj.png",
          },
        ],
        created_at: "Sat, 10 May 2025 21:56:56 GMT",
        updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      },
      {
        id: 2,
        owner_id: 2,
        title: "Lake-Union Loft with Rooftop Deck",
        description:
          "Chic loft overlooking Lake Union, featuring exposed brick, timber beams, and a shared rooftop deck.",
        tag: "Lake Union View",
        address: "2558 Eastlake Ave E",
        city: "Seattle",
        state: "WA",
        zip_code: "30303",
        property_type: "condo",
        area_sqft: 1580,
        bedrooms: 2,
        bathrooms: 2,
        latitude: 47.746734,
        longitude: -122.87435,
        price: 533030.5,
        images: [
          {
            image_url:
              "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102867/listing_images/dfm1i8msdwtq01wxupqu.png",
          },
        ],
        created_at: "Sat, 10 May 2025 21:56:56 GMT",
        updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      },
      {
        id: 3,
        owner_id: 2,
        title: "Magnolia Bluff Craftsman",
        description:
          "Classic Craftsman on Magnolia Bluff with wrap-around porch, lush garden, and panoramic sound views.",
        tag: "Puget Sound Breeze",
        address: "789 Magnolia Blvd W",
        city: "Seattle",
        state: "WA",
        zip_code: "30303",
        property_type: "house",
        area_sqft: 1820,
        bedrooms: 3,
        bathrooms: 2,
        latitude: 47.746734,
        longitude: -122.87435,
        price: 711000.77,
        images: [
          {
            image_url:
              "https://res.cloudinary.com/dncnlnhlq/image/upload/v1746921248/listing_images/oqx14hhlxpaz0rjgjj7u.png",
          },
        ],
        created_at: "Sat, 10 May 2025 21:56:56 GMT",
        updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      },
      {
        id: 4,
        owner_id: 2,
        title: "High-Rise Penthouse Downtown",
        description:
          "Luxury penthouse on the 32nd floor with 270° skyline views, concierge, and private elevator entry.",
        tag: "Downtown Skyline",
        address: "610 5th Ave S, Unit 3201",
        city: "Seattle",
        state: "WA",
        zip_code: "30303",
        property_type: "penthouse",
        area_sqft: 2100,
        bedrooms: 3,
        bathrooms: 2.5,
        latitude: 47.746734,
        longitude: -122.87435,
        price: 949950.0,
        images: [
          {
            image_url:
              "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102986/listing_images/yl5f7lqb9gehy1a9ilrg.png",
          },
        ],
        created_at: "Sat, 10 May 2025 21:56:56 GMT",
        updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      },
    ],
  },
  profile_information: {
    avatar_url:
      "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747261796/profile_images/h80yuuq3a0xmtyp4rhjg.png",
    bio: "Passionate about real estate and finding dream homes for clients.",
    city: "Seattle",
    first_name: "John",
    id: 2,
    is_deleted: false,
    last_name: "Doe",
    phone_number: "+1 (555) 123-4567",
    state: "Washington",
    user_id: 2,
    zip_code: "98001",
    email: "new@email.com",
    username: "new_user",
  },
  wishlisted_items: [],
  owned_listings: [
    {
      address: null,
      area_sqft: 1500,
      bathrooms: 2.5,
      bedrooms: 3,
      city: "Some City",
      created_at: "Sat, 10 May 2025 21:56:56 GMT",
      description: "Some Description",
      id: 1,
      images: [
        {
          caption: "Nice Pic",
          claudinary_public_id: "listing_images/v1nawkubeyq546vjshlj",
          created_at: "Mon, 12 May 2025 18:12:19 GMT",
          id: 1,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747087939/listing_images/v1nawkubeyq546vjshlj.png",
          is_primary: false,
          listing_id: 1,
        },

        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/gpap71ofbucb9kjhg5l7",
          created_at: "Mon, 12 May 2025 22:23:02 GMT",
          id: 4,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102982/listing_images/gpap71ofbucb9kjhg5l7.png",
          is_primary: false,
          listing_id: 1,
        },
        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/yl5f7lqb9gehy1a9ilrg",
          created_at: "Mon, 12 May 2025 22:23:06 GMT",
          id: 5,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102986/listing_images/yl5f7lqb9gehy1a9ilrg.png",
          is_primary: false,
          listing_id: 1,
        },
        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/lpgnjlmhyseo5zuod9wj",
          created_at: "Mon, 12 May 2025 22:23:10 GMT",
          id: 6,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102990/listing_images/lpgnjlmhyseo5zuod9wj.png",
          is_primary: false,
          listing_id: 1,
        },
        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/ja59ephwkfcukw5gvzu9",
          created_at: "Mon, 12 May 2025 22:23:15 GMT",
          id: 7,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102994/listing_images/ja59ephwkfcukw5gvzu9.png",
          is_primary: false,
          listing_id: 1,
        },
        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/piqhjlzsrbgckspcm6et",
          created_at: "Mon, 12 May 2025 22:23:19 GMT",
          id: 8,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102999/listing_images/piqhjlzsrbgckspcm6et.png",
          is_primary: false,
          listing_id: 1,
        },
        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/wbvg9lgjondqjhkormet",
          created_at: "Mon, 12 May 2025 22:23:25 GMT",
          id: 9,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747103004/listing_images/wbvg9lgjondqjhkormet.png",
          is_primary: false,
          listing_id: 1,
        },
      ],
      latitude: null,
      longitude: null,
      owner_id: 2,
      price: 799000.77,
      property_type: "house",
      state: "Some State",
      title: "Outstanding house at the beach.",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      zip_code: "Some Zipcode",
    },
    {
      address: null,
      area_sqft: 1500,
      bathrooms: 2.5,
      bedrooms: 3,
      city: "Some City",
      created_at: "Sat, 10 May 2025 22:00:17 GMT",
      description: "Some Description",
      id: 2,
      images: [
        {
          caption: "Nice Pic",
          claudinary_public_id: "listing_images/y4vkhgxvk7nos3mkxqs0",
          created_at: "Mon, 12 May 2025 22:20:02 GMT",
          id: 2,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102801/listing_images/y4vkhgxvk7nos3mkxqs0.png",
          is_primary: false,
          listing_id: 1,
        },
      ],
      latitude: null,
      longitude: null,
      owner_id: 2,
      price: 799000.77,
      property_type: "house",
      state: "Some State",
      title: "Outstanding house at the beach.",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      zip_code: "Some Zipcode",
    },
    {
      address: null,
      area_sqft: 1500,
      bathrooms: 2.5,
      bedrooms: 3,
      city: "Some City",
      created_at: "Sat, 10 May 2025 22:00:28 GMT",
      description: "Some Description",
      id: 3,
      images: [
        {
          caption: "Cool house",
          claudinary_public_id: "listing_images/dfm1i8msdwtq01wxupqu",
          created_at: "Mon, 12 May 2025 22:21:07 GMT",
          id: 3,
          image_url:
            "https://res.cloudinary.com/dncnlnhlq/image/upload/v1747102867/listing_images/dfm1i8msdwtq01wxupqu.png",
          is_primary: false,
          listing_id: 1,
        },
      ],
      latitude: null,
      longitude: null,
      owner_id: 2,
      price: 799000.77,
      property_type: "house",
      state: "Some State",
      title: "Outstanding house at the beach.",
      updated_at: "Fri, 09 May 2025 21:28:13 GMT",
      zip_code: "Some Zipcode",
    },
  ],
  auth: {
    loading: false,
    error: null,
    isAuthenticated: false,
    user: null,
    token: null,
  },
  // you can add here more slices (properties in the object) - user, theme, etc...
});
