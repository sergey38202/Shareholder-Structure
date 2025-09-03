# Shareholder Structure Visualization

A modern React application for visualizing shareholder structure data with interactive charts and responsive design.

## Features

- **Interactive Data Visualization**: Donut chart with custom legends showing shareholder distribution
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices (360px+)
- **Professional UI**: Clean design using Ant Design components and custom CSS variables
- **Real-time Data**: Axios-based API service with mock data simulation
- **Type Safety**: Full TypeScript support with comprehensive type definitions
- **Modern Architecture**: Professional service layer with interceptors and error handling

## Technology Stack

- **Frontend**: React 19.1.1 with TypeScript
- **Build Tool**: Vite 7.1.2 with Hot Module Replacement (HMR)
- **UI Library**: Ant Design for table components
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios with professional interceptor setup
- **Styling**: CSS modules with CSS custom properties
- **Code Quality**: ESLint with React and TypeScript rules

## Responsive Breakpoints

- **Desktop (>1300px)**: Side-by-side layout with table left, chart and legend right
- **Tablet (≤1300px)**: Vertical stacked layout
- **Mobile (≤768px)**: Optimized spacing and typography
- **Small Mobile (≤480px)**: Compact layout with reduced chart size

## Design System

### Color Variables
```css
--color-white: #FFFFFF
--color-dark-blue: #172339
--color-light-gray: #f5f5f6
--color-medium-gray: #e3e4e6
--color-dark-gray: #454F61
--color-blue: #69CDFF
--color-red: #FF5555
--color-yellow: #FFC94F
--color-green: #37D881
```

### Typography
- **Font Family**: Montserrat (400, 600, 700 weights)
- **Global Classes**: `.heading-h4`, `.p1-secondary`, `.p2-secondary`, `.p2-accent`, `.p3-accent`

## Project Structure

```
src/
├── components/
│   ├── ShareholderStructure/     # Main component
│   │   ├── index.tsx
│   │   └── styles.css
│   └── ui/
│       ├── ShareholderTable/     # Ant Design table
│       └── CustomLegend/         # Chart legend component
├── config/
│   └── api.ts                    # Axios configuration
├── services/
│   ├── api/
│   │   ├── base.ts              # Base API service
│   │   └── shareholderApi.ts    # Shareholder API
│   └── shareholderService.ts    # Business logic
├── types/
│   ├── api.ts                   # API response types
│   └── shareholder.ts           # Data model types
└── data/
    └── shareholderData.json     # Mock data
```

## Getting Started

### Prerequisites
- Node.js (Latest LTS version recommended)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sergey38202/Shareholder-Structure
   cd Shareholder-structure
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   Navigate to `http://localhost:5173/`

## Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## API Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://api.shareholders.com/v1
```

### API Features
- **Interceptors**: Request/response logging with authentication
- **Error Handling**: Automatic retry for network errors and rate limiting
- **Mock Data**: Realistic API simulation with delays
- **Type Safety**: Full TypeScript support for all API responses

## Data Structure

### Shareholder Data Model
```typescript
interface ShareholderData {
  id: string;
  name: string;
  value: number;
  color: string;
}
```

### API Response Format
```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}
```

## Key Features

### 1. Data Processing
- **Duplicate Filtering**: Automatically removes duplicate entries
- **Percentage Normalization**: Ensures total percentages equal 100%
- **Data Validation**: Comprehensive validation with error handling

### 2. Responsive Design
- **Adaptive Layout**: Chart and table positioning based on screen size
- **Legend Positioning**: Smart legend placement (side vs. bottom)
- **Typography Scaling**: Progressive font size reduction for mobile

### 3. Professional Architecture
- **Service Layer**: Clean separation of concerns
- **Error Boundaries**: Graceful error handling throughout the app
- **Type Safety**: Comprehensive TypeScript coverage
- **Code Quality**: ESLint configuration with React and TypeScript rules

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow React functional component patterns
- Implement proper error handling
- Use CSS custom properties for theming
- Follow responsive design principles

### Component Guidelines
- Keep components modular and reusable
- Use proper TypeScript interfaces
- Implement responsive behavior
- Follow the established design system

## Troubleshooting

### Common Issues

1. **Module Import Errors**
   - Ensure TypeScript types are imported correctly
   - Use `import type` for type-only imports

2. **Development Server Issues**
   - Clear browser cache and restart dev server
   - Check for port conflicts (default: 5173)

3. **Build Errors**
   - Run `npm run lint` to check for code quality issues
   - Ensure all TypeScript errors are resolved

## Performance Considerations

- **Code Splitting**: Vite automatically handles code splitting
- **Asset Optimization**: Images and assets are optimized during build
- **TypeScript**: Compile-time optimizations for better runtime performance
- **CSS Variables**: Efficient theming without JavaScript overhead

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## Acknowledgments

- **Ant Design** for the excellent UI components
- **Recharts** for the powerful charting library
- **Vite** for the fast build tool and development experience
- **TypeScript** for type safety and developer experience
