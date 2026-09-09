<script setup lang="ts">
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/registry/bases/reka/ui/pagination"
</script>

<template>
  <Pagination :items-per-page="10" :total="50">
    <PaginationContent>
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
        <PaginationLink href="#">
          4
        </PaginationLink>
      </PaginationItem>
      <PaginationItem :value="5">
        <PaginationLink href="#">
          5
        </PaginationLink>
      </PaginationItem>
    </PaginationContent>
  </Pagination>
</template>
