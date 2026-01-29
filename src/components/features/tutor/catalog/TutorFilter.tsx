/**
 * NODE PACKAGES
 */
import React, { useState, useEffect } from "react";

/**
 * COMPONENTS
 */
import { Search, ChevronDown, Filter, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

/**
 * INTERFACE
 */
interface TutorFilterProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  sortBy: string;
  onSortChange: (
    s: "recommended" | "price_low" | "price_high" | "rating",
  ) => void;
  filterAvailability: string;
  onAvailabilityChange: (a: string) => void;
  layout?: "horizontal" | "vertical";
}

export const TutorFilter: React.FC<TutorFilterProps> = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterAvailability,
  onAvailabilityChange,
  layout = "horizontal",
}) => {
  const isVertical = layout === "vertical";
  const [inputValue, setInputValue] = useState(searchQuery);

  // Sync local state with prop
  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  // Debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue !== searchQuery) {
        onSearchChange(inputValue);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [inputValue, onSearchChange, searchQuery]);

  return (
    <>
      <div
        className={`flex gap-4 items-center grow w-full ${isVertical ? "flex-col" : "flex-col lg:flex-row"}`}
      >
        {/* Search Bar */}
        <div
          className={`relative grow ${isVertical ? "w-full" : "w-full lg:w-auto"}`}
        >
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search by subject, skill, or tutor name..."
            className="w-full bg-background border-input text-foreground pl-12 pr-4 h-12 rounded-xl focus-visible:ring-primary/50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* Filters Group */}
        <div
          className={`flex gap-2 ${isVertical ? "flex-col w-full" : "w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0 scrollbar-hide"}`}
        >
          {isVertical ? (
            <Accordion type="multiple" className="w-full">
              <AccordionItem value="sort">
                <AccordionTrigger>Sort By</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    value={sortBy}
                    onValueChange={(val) => onSortChange(val as any)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem
                        value="recommended"
                        id="sort-recommended"
                      />
                      <Label htmlFor="sort-recommended">Recommended</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="rating" id="sort-rating" />
                      <Label htmlFor="sort-rating">Highest Rated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price_low" id="sort-price-low" />
                      <Label htmlFor="sort-price-low">Price: Low to High</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="price_high" id="sort-price-high" />
                      <Label htmlFor="sort-price-high">
                        Price: High to Low
                      </Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="availability">
                <AccordionTrigger>Availability</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    value={filterAvailability}
                    onValueChange={onAvailabilityChange}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="any" id="avail-any" />
                      <Label htmlFor="avail-any">Any Availability</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="today" id="avail-today" />
                      <Label htmlFor="avail-today">Available Today</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="weekend" id="avail-weekend" />
                      <Label htmlFor="avail-weekend">Weekends Only</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <>
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
                    onValueChange={(val) => onSortChange(val as any)}
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
                    onValueChange={onAvailabilityChange}
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
            </>
          )}
        </div>
      </div>
    </>
  );
};
