export const CASE_STUDIES: {
  id: string;
  title: string;
  path: string;
  subtitle: string;
  link: string;
  problem: {
    content: string[];
    images?: { src: string; caption?: string }[];
  };
  solution: {
    content: string[];
    images?: { src: string; caption?: string }[];
  };
  result: {
    content: string[];
    images?: { src: string; caption?: string }[];
  };
  additionalImages: { src: string; caption?: string }[];
  videoUrl: string;
  videoPoster: string;
}[] = [
  {
    id: "freightweb",
    title: "FreightWeb",
    path: "/work/freightweb",
    subtitle: "Automated Freight Sourcing & Matching.",
    link: "https://myfreightweb.com",
    problem: {
      content: [
        "There is a lot of manual work that goes into moving freight within the logistics industry. This leads to many wasted hours and reduced margins within a freight brokerage.",
        "On average, it takes a freight broker 2-3 hours to source a carrier and have an agreement in place to transport goods from origin to desintation. Even then, the agreement only provides necessary documents. Updates and changes still need to be managed with additional emails or phone calls. Once the agreement is in place, there is little information available to brokerages about the driver moving it, whether or not they are running on time, and the shipments exact location.",
        "Lastly, many of the managment systems on the market offer very poor user experiences with cumbersome and difficult to learn interfaces leading to additional wasted time and resources.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/tmw_5.png",
          caption:
            "This is a typical UI for the logistics industry and clearly demonstrates the need for for information heirarchy and design in the industry.",
        },
      ],
    },
    solution: {
      content: [
        "With the goal of transforming the industry with machine learning and a proprietary matching algorithm, we set out to match brokers looking to move domestic goods with carriers who have the available capacity and are looking for freight to fill their trucks. In order to achieve this, we would need a solution that opened up the line of communication for everyone involved.",
        "The Shipping Hub is the first piece to solving the problem. With Shipping Hub, brokers create loads with reverse-eBay style auctions. The auctions are immediately available to all carriers through a public load board. The load is also passed through the matching algorithm and matches can be invited to place a bid. Once an auction closes, the load is converted to a shipment which receives up to the minute updates on status and driver location.",
        "The Carrier Hub is a fully-featured TMS (truck management system). It allows a carrier's dispatcher to find loads on partner load boards and FreightWeb's own auctions. It also allows carriers to input and track and download their shipments, payments, drivers, financial data and much more.",
        "The Driver Hub allows the drivers to provide updates to their dispatcher on their current load, view upcoming loads, open turn-by-turn directions, upload and view shipment documents and even view past paystubs.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/shipment_dashboard_design.png",
        },
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/trip_list_wide.png",
        },
      ],
    },
    result: {
      content: [
        "The app ecosystem consists of 4 apps including the previously unmentioned Admin Hub. All 4 share styles and components. The styles are applied through a package imported into each app allowing all apps to share the same stylesheets. Components required by more than one of the apps are maintained in a component library allowing them to be shared across apps as well.",
        "By foucusing on displaying only relevant and momentary infomation, the end-to-end user experience is made up of clutter-free workflows that vastly improve task completion times. The UI is visually unified and more easily manageable over competitors products. There was an also an additional focus on simplicity and ease of use to lessen the learning curve that other logistics software requires. To add to this the user experience is streamlined, appealing and fully transparent for all invested parties.",
        "In regard to the initial goal of reducing manual effort for brokers, we were able to estimate that on average, brokers were spending ~30 minutes on placing each load. This was a vast improvement over traditional call/email efforts.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/auction_bids_2.png",
        },
      ],
    },
    additionalImages: [
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/add_shipment_1.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/add_auction.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/carrier_profile.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/driver_hub_trip.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/HelloFuel_DriverHub_Flow.png",
      },
    ],
    videoUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/FW_carrier_hub.mp4",
    videoPoster:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/FreightWeb/fw_poster.png",
  },
  {
    id: "xinova",
    title: "Xinova",
    path: "/work/xinova",
    subtitle: "Networking platform for inventors.",
    link: "https://xinova.com",
    problem: {
      content: [
        "With thousands of unused patents available and new problems waiting to be solved every single day, Xinova's mission was to find useful applications for existing patents while connecting inventors with companies looking to solve complex R&D problems.",
        "Research and development costs are often too high for large corporations to have an internal department so in their R & D needs are outsourced. The issue arises when a solution to the problem has already been solved when solving an unrelated problem. How does a company find and utilize a patent that solves a problem they are having?",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/xinova_poster.png",
        },
      ],
    },
    solution: {
      content: [
        "Xinova's Innovator Platform (X) was developed to find an answer to this problem. With Xinova's help, inventors gain access to large companies R&D projects and companies gain access to Xinova's extensive inventor network– a win/win.",
        "In X, inventors were invited to participate in research projects. In their submission, they demonstrate how their solution, either new or existing, solves the problem. If selected, the inventor is offered to enter a profit sharing agreement with the company.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/submit_2.png",
        },
      ],
    },
    result: {
      content: [
        "Xinova's efforts with the Innovator Platform have resulted in 18,000 solutions submitted in over 100 countries. Of those 18,000 solutions, 5,400 have resulted in commercial assets in nuclear physics, materials science, biomedical engineering, computer science, biophysical chemistry, theoretical physics, artificial intellegence and more.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/rfx.png",
        },
      ],
    },
    additionalImages: [
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/projects.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/solutions.png",
      },
    ],
    videoUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/Xinova_demo.mp4",
    videoPoster:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Xinova/xinova_poster.png",
  },
  {
    id: "princess",
    title: "Princess MedallionClass",
    path: "/work/princess",
    subtitle: "A reimagined Princess Caribbean cruise experience.",
    link: "https://www.princess.com/en-us/ships-and-experience/princess-medallionclass",
    problem: {
      content: [
        "Connectivity while on board a cruise ship in the middle of the ocean is an expensive and largely unsolved problem. The cost of internet access is passed to guests through expensive WiFi connections while all of the internet traffic on board the ship is routed through a single satallite signal leading to sluggish and spotty connections.",
        "Most of the guests' needs for internet could be satisfied by offering a local network onboard the ship- including location tracking and mapping, social interactivity, and access to many other services or activities on board the ship itself. In addition to the problem with connectivity, the demographic among guests was aging and updating the experience would attract younger passengers. Cruising was getting stale and it was ripe for reinvigoration.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/chat_home.png",
        },
      ],
    },
    solution: {
      content: [
        "Carnival Cruiselines assembled a very large team of engineers, builders, hardware experts, and software developers to undertake this very ambitious project. I personally was involved in the guests' social interaction and communication in Ocean Chat. This was a pivotal role in the success of the product as it solved one of the largest needs for WiFi service- staying in touch with other members of their travel party.",
        'I knew that by creating a simple and intuitive interface that would be somewhat familiar to them through other messaging apps, that I would have a good base to form the UI of the messaging app from. The challenging part of my assignment was integrating less traditional sharing options to the app as well as group voice and video calling. In addition to the app being quite featureful, it also needed to be supported on three very different screen sizes- a 55" vertial touch screen portal, a 24" touch screen monitor, as well as all mobile screens. Keeping design simple proved quite a challenge.',
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/chat_home_half.png",
        },
      ],
    },
    result: {
      content: [
        "The result is familiar and intuitive yet fresh and full of all the features you can expect from another messaging app. Plus it offers other unexpected features such as event and location sharing made possible by the ship's onboard local network.",
        "Carnival Cruiselines has since integrated Ocean Compass into all of their Caribbean Princess cruises under their MedaillionClass service.",
      ],
      images: [
        {
          src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/conversation.png",
        },
      ],
    },
    additionalImages: [
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/full_open_selected_pp.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/messages.png",
      },
      {
        src: "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/mini_open_selected.png",
      },
    ],
    videoUrl:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/ocean_intro_ces_2017.mp4",
    videoPoster:
      "https://s3-us-west-2.amazonaws.com/ryancanfield.me-images/Ocean/ocean_poster.png",
  },
];
