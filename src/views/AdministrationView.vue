<script setup>
import { ref } from 'vue';
import Timesheet from '@/components/admin/Timesheet.vue';
import Availability from '@/components/admin/Availability.vue';
import Prescription from '@/components/admin/Prescription.vue';
import Resource from '@/components/admin/Resource.vue';
import Analyse from '@/components/admin/Analyse.vue';

const activeTab = ref('timesheet');
</script>

<template>
    <div>
        <div class="flex flex-wrap">
            <div class="w-full border-b border-gray-200 mb-4 mr-4 pl-4 pt-2">
                <ul class="flex flex-wrap text-sm font-medium text-center text-gray-500">
                    <li class="mr-2">
                        <p :class="activeTab === 'timesheet'
                            ? 'text-primary border-b-2 border-primary'
                            : 'border-b-2 border-transparent hover-primary hover:border-primary'
                            " class="inline-flex items-center justify-center p-2 cursor-pointer"
                            @click="activeTab = 'timesheet'">
                            Emploi du temps
                        </p>
                    </li>
                    <li class="mr-2">
                        <p :class="activeTab === 'availability'
                            ? 'text-primary border-b-2 border-primary'
                            : 'border-b-2 border-transparent hover-primary hover:border-primary'
                            " class="inline-flex items-center justify-center p-2 cursor-pointer"
                            @click="activeTab = 'availability'">
                            Disponibilités
                        </p>
                    </li>
                    <li class="mr-2">
                        <p :class="activeTab === 'prescription'
                            ? 'text-primary border-b-2 border-primary'
                            : 'border-b-2 border-transparent hover:text-primary hover:border-primary'
                            " class="inline-flex items-center justify-center p-2 cursor-pointer"
                            @click="activeTab = 'prescription'">
                            Prescriptions
                        </p>
                    </li>
                    <li class="mr-2">
                        <p :class="activeTab === 'resource'
                            ? 'text-primary border-b-2 border-primary'
                            : 'border-b-2 border-transparent hover:text-primary hover:border-primary'
                            " class="inline-flex items-center justify-center p-2 cursor-pointer"
                            @click="activeTab = 'resource'">
                            Ressources
                        </p>
                    </li>
                    <li class="mr-2">
                        <p :class="activeTab === 'analyse'
                            ? 'text-primary border-b-2 border-primary'
                            : 'border-b-2 border-transparent hover:text-primary hover:border-primary'
                            " class="inline-flex items-center justify-center p-2 cursor-pointer"
                            @click="activeTab = 'analyse'">
                            Analyse du cabinet
                        </p>
                    </li>
                </ul>
            </div>

            <div class="w-full">
                <div v-show="activeTab === 'timesheet'" class="w-full">
                    <Timesheet />
                </div>
                <div v-show="activeTab === 'availability'" class="w-full">
                    <Availability />
                </div>
                <div v-show="activeTab === 'prescription'" class="w-full">
                    <Prescription />
                </div>
                <div v-show="activeTab === 'resource'" class="w-full">
                    <Resource />
                </div>
                <div v-show="activeTab === 'analyse'" class="w-full">
                    <Analyse />
                </div>
            </div>
        </div>
    </div>
</template>