const Track = require('../models/TrackModel');

const resolvers = {
  Query: {
    getAllTracks: async () => {
      return await Track.find();
    },
    getTrack: async (_parent, args, _context, _info) => {
      return await Track.findById(args.id);
    },
  },
  Mutation: {
    createTrack: async (_parent, args, _context, _info) => {
      const track = new Track(args.track);
      await track.save();
      return track;
    },
    deleteTrack: async (_parent, args, _context, _info) => {
      await Track.findByIdAndDelete(args.id);
      return 'Track deleted.';
    },
    updateTrack: async (_parent, args, _context, _info) => {
      const post = await Track.findByIdAndUpdate(args.id, args.track, {
        new: true,
      });
      return post;
    },
  },
};

module.exports = resolvers;
