<template>
  <FormKit type="form" v-if="editing" @submit="onSubmit" :actions="false">
    <div class="flex-row-center gap-2">
      <FormKit
        type="text"
        :name="name"
        :value="value"
        :placeholder="placeholder"
        :validation="validation"
        :validation-label="validationLabel"
        outer-class="!mb-0"
      >
        <template #suffix>
          <div class="flex gap-1 mx-1">
            <button type="submit" title="Save">
              <IconFluentSave24Regular class="w-5 text-teal-500 hover:text-teal-600" />
            </button>
            <button type="button" title="Cancel" @click="toggleEditing()">
              <IconFluentDismiss24Regular class="w-5 text-red-400 hover:text-red-500" />
            </button>
          </div>
        </template>
      </FormKit>
    </div>
  </FormKit>

  <div v-else class="flex-row-center gap-1">
    <slot />

    <button type="button" @click="toggleEditing()" title="Edit">
      <IconFluentEdit16Filled class="w-4 default-hover" />
    </button>
  </div>
</template>

<script setup>
const emit = defineEmits(["input"]);

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  validation: {
    type: String,
    default: "",
  },
  validationLabel: {
    type: String,
    default: "",
  },
  value: {
    type: String,
    default: "",
  },
});

// Data
const [editing, toggleEditing] = useToggle();

// Methods
const onSubmit = (input) => {
  emit("input", input?.[props?.name]);
  editing.value = false;
};
</script>
