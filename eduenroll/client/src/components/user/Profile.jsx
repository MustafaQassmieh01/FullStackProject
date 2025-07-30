function ProfilePage() {
  const user = {
    name: "Jane Doe",
    title: "Software Engineer",
    avatar: "https://via.placeholder.com/150",
    bio: "Passionate about coding, design, and creating user-friendly apps.",
    stats: {
      followers: 1200,
      following: 300,
      posts: 45,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-24 h-24 rounded-full border-4 border-indigo-500"
          />
          <h2 className="mt-4 text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.title}</p>
        </div>

        {/* Bio */}
        <p className="mt-4 text-center text-gray-600">{user.bio}</p>

        {/* Stats */}
        <div className="mt-6 grid grid-cols-3 text-center">
          <div>
            <p className="text-lg font-bold">{user.stats.followers}</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.stats.following}</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
          <div>
            <p className="text-lg font-bold">{user.stats.posts}</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">
            Follow
          </button>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;