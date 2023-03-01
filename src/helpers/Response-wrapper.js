module.exports = async (callback, res) => {
    let response = {
        error: null,
        successful: false
    };

    try {
        response = await callback(response);
    } catch (e) {
        console.log(e);

        response.error = typeof e == 'object' ? 'Something went wrong, please try again later!' : e;
    }

    res.status(200).json(response)
};
