const tacticController = {
    changeTactic: async (req, res) => {
        try {
            const { tacticId, newTactic } = req.body;

            //find the tactic in the database and update it with the new data
            res.status(200).json({ message: 'tactic updated' });
        } catch (error) {
            console.error('error changing tactic:', error);
            res.status(500).json({ error: 'error with tactic' });
        }
    },
};


module.exports = tacticController;