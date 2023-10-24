export const resolvers = {
  Query: {
    user(parent, args, contextValue, info) {
      return users.find((user) => user.userId === args.userId);
    },
  },
  User: {
    orders(parent){
      return orders.filter((order)=>order.userId === parent.userId )
    }
  },
  Order: {
      items(parent){
        return parent.items.map((itemId) => {
        return items.find((item)=>item.itemId === itemId)
        })
      },
      orderPrice(parent){
        return parent.items.map((itemId) => {
        return items.find((item)=>item.itemId === itemId)
        }).reduce((sum,item) => sum+item.itemPrice, 0)
      }

  }
};