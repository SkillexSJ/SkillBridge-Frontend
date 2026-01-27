import React from "react";
import { Search, ChevronDown, Filter, Clock, LayoutGrid } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

interface TutorFilterProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: string;
  setSortBy: (s: "recommended" | "price_low" | "price_high" | "rating") => void;
  filterAvailability: string;
  setFilterAvailability: (a: string) => void;
}

export const TutorFilter: React.FC<TutorFilterProps> = ({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  filterAvailability,
  setFilterAvailability,
}) => {
  return (
    <div className="flex flex-col gap-6 mb-10">
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="relative grow w-full lg:w-auto">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by subject, skill, or tutor name..."
            className="w-full bg-background border-input text-foreground pl-12 pr-4 h-12 rounded-xl focus-visible:ring-primary/50"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters Group */}
        <div className="flex gap-2 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide">
          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground px-4 justify-between min-w-40"
              >
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  <span>Sort</span>
                </div>
                <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border text-popover-foreground">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuRadioGroup
                value={sortBy}
                onValueChange={(val) => setSortBy(val as any)}
              >
                <DropdownMenuRadioItem
                  value="recommended"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Recommended
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="rating"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Highest Rated
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="price_low"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Price: Low to High
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="price_high"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Price: High to Low
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Availability Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="h-12 rounded-xl border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground px-4 justify-between min-w-45"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Availability</span>
                </div>
                <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-popover border-border text-popover-foreground">
              <DropdownMenuLabel>Availability</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuRadioGroup
                value={filterAvailability}
                onValueChange={setFilterAvailability}
              >
                <DropdownMenuRadioItem
                  value="any"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Any Availability
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="today"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Available Today
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem
                  value="weekend"
                  className="focus:bg-accent focus:text-accent-foreground"
                >
                  Weekends Only
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
