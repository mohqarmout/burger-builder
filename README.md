## burger-builder

## **Team Members**

- [Greg Westneat](https://github.com/leggomuhgreggo) (The boss down here)
- [Mohammed Qarmout](https://github.com/FadiAlamassi)

## **User Journey**

The user will be able to build a burger and the app will be able to calculate the price and store the orders in the cloud, also will bea apple to view its order from the cloud.

The user will not be able to purchase the burger unless he is signed in, but he can build one.

## **Technologies** :computer:

- react
- redux
- redux-thunk
- react-hooks
- jest
- axios
- enzyme-testing
- firebase-realtime-database
- GitHub Actions

## Challenges Achieved :tada:

- [x] Make sure the app if fully optimize for performance.
- [x] Apply for route protection
- [x] Applying testing best practices [unit , integration]

### Project setup

1. Create a `.env` file in the project root folder.
2. Add `REACT_APP_FIREBASE_KEY` for your realtime database

### database schema

```json
{
  "ingredient": {
    "bacon": 0,
    "cheese": 0,
    "meat": 0,
    "salad": 0
  }
}
```

> firebase will also create an order field to store the orders
