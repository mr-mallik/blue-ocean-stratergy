
# Competitive Analysis App - Blue Ocean Strategy

This application is designed to facilitate competitive analysis using the principles of Blue Ocean Strategy by Renée Mauborgne and W. Chan Kim. The app allows users to input and visualize the competitive landscape of their business compared to their competitors based on various features.

## Features

The app includes the following sections:

### 1. Company Information
- **Your Company Name**: A text input field where the user enters the name of their company.

### 2. Competitor Information
- **List of Competitors**: Three text input fields (C1, C2, C3) where the user enters the names of their competitors.

### 3. Competitive Features
- **List of Features (excluding price)**: 
  - Five text input fields (F1, F2, F3, F4, F5) to enter the key competitive features that will be used to compare companies.
  - **Price** is automatically included as the first feature.

### 4. Score Matrix for Competitors
- A dynamic table where users score each competitor based on the features (including Price) from 0 to 100. 
  - **Rows** represent competitors (C1, C2, C3).
  - **Columns** represent Price and the user-defined competitive features (F1, F2, F3, F4, F5).

#### Example:

| Competitor | Price | Feature 1 | Feature 2 | Feature 3 | Feature 4 | Feature 5 |
|------------|-------|-----------|-----------|-----------|-----------|-----------|
| C1         | 90    | 75        | 60        | 80        | 70        | 85        |
| C2         | 80    | 65        | 50        | 70        | 60        | 75        |
| C3         | 85    | 70        | 55        | 75        | 65        | 80        |

### 5. Data Submission and Visualization
- **Save Button**: Once all the fields are filled, the user clicks the "Save" button to save the data and move to the visualization page.
- **Graphical Representation**: Redirects to another page that displays the score matrix as a line chart using the ApexCharts library.
  - **X-axis**: List of competitors (C1, C2, C3).
  - **Y-axis**: Features (Price, F1, F2, F3, F4, F5).
  - The graph shows a multi-series line chart with data points corresponding to the scores entered.

## Setup Instructions

### Prerequisites
- **Node.js** (v14 or later)
- **npm** or **yarn**

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/mr-mallik/blue-ocean-stratergy.git
   ```

2. **Navigate to the project folder**:
   ```bash
   cd blue-ocean-stratergy
   ```

3. **Install dependencies**:
   Using npm:
   ```bash
   npm install
   ```
   Using yarn:
   ```bash
   yarn install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm start
   ```
   or
   ```bash
   yarn start
   ```

2. Open the app in your browser at `http://localhost:3000`.

### Build for Production

To create a production build of the application, run:
```bash
npm run build
```
or
```bash
yarn build
```

### Technologies Used

- **React.js**: For building the user interface.
- **ApexCharts.js**: For visualizing the competitive analysis in line charts.
- **HTML5/CSS3**: For basic structure and styling.

### Future Improvements
- Adding more competitor input fields for larger businesses.
- Allowing users to dynamically add or remove features and competitors.
- Storing analysis data persistently using a backend service or local storage.
- Enhancing visualization with more chart options, like radar charts.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
