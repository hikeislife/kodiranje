// called at backand from at least courses and articles routers

// #NOTE: collection is to determine which collection to update

const updateEach = async (item, collection) => {
  try {
    let update = await collection.findByIdAndUpdate(item._id, item, {
      new: true,
      runValidators: true
    })
  } catch (err) {
    console.error(err)
  }
}

module.exports = updateEach