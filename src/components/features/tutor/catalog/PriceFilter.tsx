/**
 * NODE PACKAGE
 */
import React from "react";
import { DollarSign, ChevronDown } from "lucide-react";

/**
 * COMPONENTS
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * INTERFACE
 */
interface PriceFilterProps {
  minPrice: number | "";
  maxPrice: number | "";
  onMinPriceChange: (value: number | "") => void;
  onMaxPriceChange: (value: number | "") => void;
  fullWidth?: boolean;
}

export const PriceFilter: React.FC<PriceFilterProps> = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  fullWidth = false,
}) => {
  const handleBlur = () => {
    if (
      minPrice !== "" &&
      maxPrice !== "" &&
      Number(minPrice) > Number(maxPrice)
    ) {
      onMinPriceChange(maxPrice);
      onMaxPriceChange(minPrice);
    }
  };

  return (
    <>
      {fullWidth ? (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="price">
            <AccordionTrigger>Hourly Rate ($)</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-2 items-center pt-2">
                <div className="grid gap-1.5 w-full">
                  <Label
                    htmlFor="min-price-mobile"
                    className="text-xs text-muted-foreground"
                  >
                    Min
                  </Label>
                  <Input
                    id="min-price-mobile"
                    type="number"
                    placeholder="0"
                    value={minPrice}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? "" : Number(e.target.value);
                      onMinPriceChange(val);
                    }}
                    onBlur={handleBlur}
                    className="h-8"
                    min={0}
                  />
                </div>
                <span className="text-muted-foreground mt-5">-</span>
                <div className="grid gap-1.5 w-full">
                  <Label
                    htmlFor="max-price-mobile"
                    className="text-xs text-muted-foreground"
                  >
                    Max
                  </Label>
                  <Input
                    id="max-price-mobile"
                    type="number"
                    placeholder="500"
                    value={maxPrice}
                    onChange={(e) => {
                      const val =
                        e.target.value === "" ? "" : Number(e.target.value);
                      onMaxPriceChange(val);
                    }}
                    onBlur={handleBlur}
                    className="h-8"
                    min={0}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className={`h-12 rounded-xl border-input bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground px-4 justify-between ${fullWidth ? "w-full" : "min-w-40"}`}
            >
              <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4" />
                <span>Price</span>
              </div>
              <ChevronDown className="w-4 h-4 opacity-50 ml-2" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-popover border-border text-popover-foreground p-4">
            <DropdownMenuLabel>Hourly Rate ($)</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-border mb-4" />
            <div className="flex gap-2 items-center">
              <div className="grid gap-1.5">
                <Label
                  htmlFor="min-price"
                  className="text-xs text-muted-foreground"
                >
                  Min
                </Label>
                <Input
                  id="min-price"
                  type="number"
                  placeholder="0"
                  value={minPrice}
                  onChange={(e) => {
                    const val =
                      e.target.value === "" ? "" : Number(e.target.value);
                    onMinPriceChange(val);
                  }}
                  onBlur={handleBlur}
                  className="h-8"
                  min={0}
                />
              </div>
              <span className="text-muted-foreground mt-5">-</span>
              <div className="grid gap-1.5">
                <Label
                  htmlFor="max-price"
                  className="text-xs text-muted-foreground"
                >
                  Max
                </Label>
                <Input
                  id="max-price"
                  type="number"
                  placeholder="500"
                  value={maxPrice}
                  onChange={(e) => {
                    const val =
                      e.target.value === "" ? "" : Number(e.target.value);
                    onMaxPriceChange(val);
                  }}
                  onBlur={handleBlur}
                  className="h-8"
                  min={0}
                />
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
};
