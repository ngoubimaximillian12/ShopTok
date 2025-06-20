import { logEvent } from '../../services/eventTracker';

// Inside product like handler
const handleLike = async () => {
  // existing like logic
  await logEvent('like', product.id);
};

// Inside product view effect or componentDidMount
useEffect(() => {
  logEvent('view', product.id);
}, [product.id]);

// Inside add to cart
const handleAddToCart = async () => {
  // existing add to cart logic
  await logEvent('add_to_cart', product.id);
};
