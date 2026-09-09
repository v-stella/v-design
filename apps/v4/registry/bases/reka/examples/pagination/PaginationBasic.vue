<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/registry/bases/reka/ui/pagination"
</script>

<template>
  <Pagination :items-per-page="10" :total="50">
    <PaginationContent>
      <PaginationPrevious href="#" />
      <PaginationItem :value="1">
        <PaginationLink href="#">
          1
        </PaginationLink>
      </PaginationItem>
      <PaginationItem :value="2">
        <PaginationLink href="#" :is-active="true">
          2
        </PaginationLink>
      </PaginationItem>
      <PaginationItem :value="3">
        <PaginationLink href="#">
          3
        </PaginationLink>
      </PaginationItem>
      <PaginationItem :value="4">
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationNext href="#" />
    </PaginationContent>
  </Pagination>
</template>
