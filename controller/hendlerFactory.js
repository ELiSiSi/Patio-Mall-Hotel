import AppError from '../utils/appError.js';

// Create One -----------------------------------------------------------------------------------
export const createOne = (Model) => async (req, res, next) => {
  console.log('📥 Request Body:', req.body);

  try {
    const doc = await Model.create(req.body);


    return res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {


    // Return JSON error instead of passing to next()
    return res.status(400).json({
      status: 'fail',
      message: error.message,
      error: {
        name: error.name,
        code: error.code,
      },
    });
  }
};

// Get All -----------------------------------------------------------------------------------
export const getAll = (Model) => async (req, res, next) => {
  try {
    const docs = await Model.find().select('-__v');

    return res.status(200).json({
      status: 'success',
      results: docs.length,
      data: {
        data: docs,
      },
    });
  } catch (error) {
     return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Get One -----------------------------------------------------------------------------------
export const getOne = (Model, popOptions) => async (req, res, next) => {
  try {
    let query = Model.findById(req.params.id);
    if (popOptions) query = query.populate(popOptions);
    const doc = await query;

    if (!doc) {
      return res.status(404).json({
        status: 'fail',
        message: 'No document found with that ID',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
    console.error('❌ Error in getOne:', error.message);
    return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Update One -----------------------------------------------------------------------------------
export const updateOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return res.status(404).json({
        status: 'fail',
        message: 'No document found with that ID',
      });
    }

    return res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  } catch (error) {
     return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Delete One -----------------------------------------------------------------------------------
export const deleteOne = (Model) => async (req, res, next) => {
  try {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return res.status(404).json({
        status: 'fail',
        message: 'No document found with that ID',
      });
    }

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
     return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};

// Delete All -----------------------------------------------------------------------------------
export const deleteAll = (Model) => async (req, res, next) => {
  try {
    await Model.deleteMany();

    return res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
     return res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
