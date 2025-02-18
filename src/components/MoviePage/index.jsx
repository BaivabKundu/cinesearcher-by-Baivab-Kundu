import React, { useState } from "react";

import { Search } from "neetoicons";
import { Input } from "neetoui";

const MoviePage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="p-6">
      <div className="mx-auto mb-8 max-w-2xl">
        <Input
          className="rounded-lg border border-[#ddd]"
          placeholder="Search for movies..."
          prefix={<Search />}
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};

export default MoviePage;
