# R&M Groups - Premium Travel & Logistics

Welcome to R&M Groups' premium travel and logistics platform. This modern web application provides comprehensive travel services and logistics solutions with AI-powered assistance.

## About R&M Groups

R&M Groups is a premium travel and logistics company dedicated to providing exceptional service and seamless experiences for our clients. Our platform combines cutting-edge technology with personalized service to deliver world-class travel and logistics solutions.

## Features

- **Premium Travel Services**: Comprehensive travel planning and booking
- **Logistics Solutions**: Advanced logistics and transportation management  
- **AI-Powered Assistance**: Intelligent chatbot for customer support
- **Modern Interface**: Responsive design with intuitive user experience
- **Real-time Support**: Instant assistance and service updates

## Development Setup

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Build Tool**: Vite
- **UI Components**: Lucide React icons
- **AI Integration**: Google Generative AI
- **Styling**: Modern CSS with responsive design

## Project Structure

```
├── components/          # Reusable UI components
│   ├── ChatBot.tsx     # AI-powered customer support
│   ├── ContactForm.tsx # Customer contact interface
│   ├── Navbar.tsx      # Navigation component
│   └── ServiceCard.tsx # Service display cards
├── App.tsx             # Main application component
├── constants.tsx       # Application constants
├── geminiService.ts    # AI service integration
├── types.ts           # TypeScript type definitions
└── index.tsx          # Application entry point
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## Support

For technical support or business inquiries, please contact our development team or visit our main website.

---

© 2024 R&M Groups - Premium Travel & Logistics. All rights reserved.