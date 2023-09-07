const { data } = require("../data");

const getTotalRecovered = async (req, res) => {
  const recovered = data.reduce((prev, current) => {
    return prev + current.recovered;
  }, 0);
  res.status(200).json({ data: { _id: "total", recovered } });
};

const getTotalActive = async (req, res) => {
  const active = data.reduce((prev, current) => {
    return prev + current.infected - current.recovered;
  }, 0);
  res.status(200).json({ data: { _id: "total", active } });
};

const getTotalDeath = async (req, res) => {
  const death = data.reduce((prev, current) => {
    return prev + current.death;
  }, 0);
  res.status(200).json({ data: { _id: "total", death } });
};

const gethotspotStates = async (req, res) => {
  const hotspotStates = [];
  data.forEach((state) => {
    const rate = (state.infected - state.recovered) / state.infected;
    if (rate > 0.1) {
      hotspotStates.push({ state: state.state, rate: rate.toFixed(5) });
    }
  });
  res.status(200).json({ data: hotspotStates });
};

const gethealthyStates = async (req, res) => {
  // death /infected
  const healthyStates = [];
  data.forEach((state) => {
    const mortality = state.death / state.infected;
    if (mortality < 0.005) {
      healthyStates.push({
        state: state.state,
        mortality: mortality.toFixed(5),
      });
    }
  });
  res.status(200).json({ data: healthyStates });
};

module.exports = {
  getTotalRecovered,
  getTotalActive,
  getTotalDeath,
  gethotspotStates,
  gethealthyStates,
};
