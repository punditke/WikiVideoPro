import '../styles/globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { AppProvider } from '../context/AppContext';

export default function App({ Component, pageProps, router }) {
  return (
    <AppProvider>
      <AnimatePresence mode="wait">
        <motion.div
          key={router.route}
          initial="initialState"
          animate="animateState"
          exit="exitState"
          transition={{
            duration: 0.75,
          }}
          variants={{
            initialState: {
              opacity: 0,
            },
            animateState: {
              opacity: 1,
            },
            exitState: {
              opacity: 0,
            },
          }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </AppProvider>
  );
}
