# FortSaga

A comprehensive platform dedicated to preserving and protecting the magnificent historic forts of Chhatrapati Shivaji Maharaj. FortSaga empowers citizens, administrators, and visitors to actively participate in heritage conservation through innovative digital tools.

## 🌟 Features

### For Citizens
- **Issue Reporting**: Report maintenance issues, damage, or safety concerns with photo documentation
- **Progress Tracking**: Monitor conservation efforts and see the impact of community contributions
- **Community Engagement**: Connect with fellow heritage enthusiasts and contribute to preservation
- **Recognition System**: Earn badges and recognition for your contributions

### For Visitors
- **Fort Explorer**: Discover detailed information about each fort including history, architecture, and visitor guides
- **Interactive Maps**: Navigate and explore forts with comprehensive location data
- **Photo Galleries**: Browse stunning photography and historical images
- **Visit Planning**: Get detailed information about timings, fees, and facilities

### For Administrators
- **Admin Dashboard**: Manage fort profiles, oversee reports, and coordinate conservation efforts
- **Report Management**: Track and resolve maintenance issues efficiently
- **Analytics**: Monitor platform usage and conservation progress
- **User Management**: Oversee citizen and visitor accounts

### Educational Features
- **Historical Content**: Learn about the rich history and cultural significance of forts
- **Interactive Quizzes**: Test your knowledge about fort history and heritage
- **QR Code Scanner**: Access fort information instantly through QR codes
- **Learning Modules**: Comprehensive educational content about Maratha history

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component library
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Backend-as-a-Service for authentication and real-time features
- **MongoDB** - NoSQL database for flexible data storage
- **Next.js API Routes** - Serverless API endpoints

### Additional Libraries
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **QR Scanner** - QR code scanning functionality
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

## 🚀 Installation

### Prerequisites
- Node.js 18+
- npm or pnpm
- MongoDB database
- Supabase account

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Harsh-901/fortsaga
   cd fortsaga
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   pnpm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Database Setup**
   - Set up your MongoDB database
   - Configure Supabase project with authentication
   - Run database migrations if any

5. **Run the development server**
   ```bash
   npm run dev
   # or
   pnpm dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage

### For Citizens
1. Register/Login to access citizen features
2. Report issues by uploading photos and descriptions
3. Track the status of your reports
4. Participate in community discussions
5. Earn badges for contributions

### For Visitors
1. Browse the fort catalog
2. View detailed fort information
3. Plan visits with provided guides
4. Access educational content
5. Take interactive quizzes

### For Administrators
1. Access the admin dashboard
2. Manage fort profiles and data
3. Review and resolve reports
4. Monitor platform analytics
5. Manage user accounts

## 🏗️ Project Structure

```
fortsaga/
├── app/                    # Next.js app directory
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── citizen/           # Citizen dashboard
│   ├── forts/             # Fort exploration pages
│   ├── learn/             # Educational content
│   ├── quiz/              # Quiz system
│   ├── reports/           # Report management
│   └── scanner/           # QR scanner
├── components/            # Reusable UI components
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions and configurations
├── public/                # Static assets
├── styles/                # Global styles
└── backend/               # Backend utilities (if any)
```

## 🤝 Contributing

We welcome contributions to FortSaga! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow TypeScript best practices
- Use conventional commit messages
- Ensure all tests pass
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Chhatrapati Shivaji Maharaj for his visionary leadership
- The Archaeological Survey of India for heritage preservation
- All contributors and community members
- Open source community for the amazing tools and libraries

## 📞 Contact

For questions, suggestions, or support:
- Create an issue on GitHub
- Email: contact@fortsaga.com
- Website: [https://fortsaga.com](https://fortsaga.com)

---

**FortSaga** - Preserving Heritage, Building Future 🇮🇳
