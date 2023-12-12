// Importing necessary CSS files and modules
import './App.css';
import styles from './styles/App.module.css';

// Importing required React components
import NavBar from './components/Navbar';
import TransactionForm from './components/transaction/TransactionForm';
import ActivityCard from './components/activity/ActivityCard';

// App component containing the main structure
function App() {
  return (
    // Main wrapper div with specified CSS class
    <div className={styles.wrapper}>
       {/* Header section containing the NavBar component */}
       <header>
          <NavBar />
       </header>
       
       {/* Main content area */}
       <main className={styles.mainContainer}>
          {/* Activity container for displaying ActivityCard */}
          <div className={styles.activityContainer}>
            <ActivityCard />
          </div>
          
          {/* Side container for displaying TransactionForm */}
          <div className={styles.sideContainer}>
            <TransactionForm />
          </div> 
       </main>
    </div>
  );
}

// Exporting the App component as the default export
export default App;
